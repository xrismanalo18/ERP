import OpenAI from "openai";
import { NextResponse } from "next/server";
import pg from "pg";

export const runtime = "nodejs";

type RiskLevel = "Low" | "Medium" | "High" | "Critical";
type Sentiment = "Positive" | "Neutral" | "Negative";

type NormalizedSlackMessage = {
  sourceMessageId: string;
  sourceChannelId: string;
  channel: string;
  sender: string;
  clientName: string;
  contractId: string;
  hardwareCategory: string;
  messageText: string;
  startDate: string;
  termDate: string;
  amount: number;
  currency: string;
  riskLevel: RiskLevel;
  sentiment: Sentiment;
  stage: string;
  slackTimestamp: string;
};

type SlackHistoryMessage = {
  ts?: string;
  text?: string;
  user?: string;
  username?: string;
  bot_id?: string;
  subtype?: string;
};

type SlackApiResponse<T> = T & {
  ok: boolean;
  error?: string;
};

type SlackConversationHistory = SlackApiResponse<{
  messages?: SlackHistoryMessage[];
  has_more?: boolean;
  response_metadata?: { next_cursor?: string };
}>;

type SlackConversationInfo = SlackApiResponse<{
  channel?: { id?: string; name?: string; is_im?: boolean };
}>;

type SlackConversationList = SlackApiResponse<{
  channels?: Array<{ id?: string; name?: string; is_member?: boolean; is_im?: boolean; is_channel?: boolean; is_group?: boolean }>;
  response_metadata?: { next_cursor?: string };
}>;

type SlackUserInfo = SlackApiResponse<{
  user?: {
    id?: string;
    name?: string;
    real_name?: string;
    profile?: { display_name?: string; real_name?: string };
  };
}>;

type AiExtraction = {
  sourceMessageId: string;
  clientName?: string;
  contractId?: string;
  hardwareCategory?: string;
  startDate?: string;
  termDate?: string;
  amount?: number;
  currency?: string;
  riskLevel?: RiskLevel;
  sentiment?: Sentiment;
  stage?: string;
};

const DEFAULT_CHANNEL_IDS = ["D0BDPRDE95H", "D0BDSPWTVUM"];
const SLACK_HISTORY_LIMIT = 200;
const DATE_RE = /\b(20\d{2}-\d{2}-\d{2})\b/g;
const CONTRACT_RE = /\b([A-Z]{2,}[-_ ]?\d{4,}[-_ ]?\d*)\b/;
const AMOUNT_RE = /(?:\$|usd\s*)\s*([0-9][0-9,]*(?:\.\d{1,2})?)|([0-9][0-9,]*(?:\.\d{1,2})?)\s*(?:usd|dollars)\b/i;

function configuredChannelIds() {
  return (process.env.SLACK_INSIGHTS_CHANNEL_IDS || DEFAULT_CHANNEL_IDS.join(","))
    .split(",")
    .map(channel => channel.trim())
    .filter(Boolean);
}

function postgresClient() {
  if (!process.env.POSTGRES_URL) throw new Error("POSTGRES_URL is not configured.");
  const connectionUrl = new URL(process.env.POSTGRES_URL);
  connectionUrl.searchParams.delete("sslmode");
  connectionUrl.searchParams.delete("sslrootcert");
  return new pg.Client({
    connectionString: connectionUrl.toString(),
    ssl: { rejectUnauthorized: false },
  });
}

async function ensureSlackMessages(database: pg.Client) {
  await database.query(`
    create extension if not exists pgcrypto;
    create table if not exists public.slack_contract_messages (
      id uuid primary key default gen_random_uuid(),
      source_message_id text not null unique,
      channel text not null,
      sender text not null,
      client_name text not null,
      contract_id text not null,
      hardware_category text not null,
      message_text text not null,
      start_date date not null,
      term_date date not null,
      amount numeric(14,2) not null,
      currency text not null default 'USD',
      risk_level text not null,
      sentiment text not null,
      stage text not null,
      slack_timestamp timestamptz not null,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );
  `);

  await database.query(`
    alter table public.slack_contract_messages
      add column if not exists source_channel_id text,
      add column if not exists slack_sender_id text,
      add column if not exists raw_slack_message jsonb;
  `);
}

async function slackRequest<T>(method: string, params: Record<string, string | number | undefined>) {
  const token = process.env.SLACK_BOT_TOKEN;
  if (!token) throw new Error("SLACK_BOT_TOKEN is not configured.");

  const url = new URL(`https://slack.com/api/${method}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const payload = (await response.json()) as SlackApiResponse<T>;
  if (!response.ok || !payload.ok) {
    throw new Error(`Slack ${method} failed: ${payload.error || response.statusText}`);
  }
  return payload;
}

async function getChannelLabel(channelId: string) {
  try {
    const payload = await slackRequest<SlackConversationInfo>("conversations.info", { channel: channelId });
    const name = payload.channel?.name;
    return name ? `#${name}` : channelId;
  } catch {
    return channelId;
  }
}

async function getSenderLabel(userId: string | undefined, cache: Map<string, string>) {
  if (!userId) return "Slack user";
  if (cache.has(userId)) return cache.get(userId) as string;

  try {
    const payload = await slackRequest<SlackUserInfo>("users.info", { user: userId });
    const user = payload.user;
    const label = user?.profile?.display_name || user?.profile?.real_name || user?.real_name || user?.name || userId;
    cache.set(userId, label);
    return label;
  } catch {
    cache.set(userId, userId);
    return userId;
  }
}

async function fetchSlackMessages(channelIds: string[]) {
  const senderCache = new Map<string, string>();
  const normalized: NormalizedSlackMessage[] = [];

  for (const channelId of channelIds) {
    const channelLabel = await getChannelLabel(channelId);
    let cursor = "";
    let page = 0;

    do {
      const payload = await slackRequest<SlackConversationHistory>("conversations.history", {
        channel: channelId,
        limit: SLACK_HISTORY_LIMIT,
        cursor,
      });

      for (const message of payload.messages || []) {
        const text = (message.text || "").replace(/<mailto:([^|>]+)\|([^>]+)>/g, "$2").replace(/<([^|>]+)\|([^>]+)>/g, "$2").trim();
        if (!message.ts || !text || message.subtype === "message_deleted") continue;

        const slackTimestamp = slackTsToIso(message.ts);
        normalized.push({
          ...extractContractFields(text, slackTimestamp),
          sourceMessageId: `${channelId}:${message.ts}`,
          sourceChannelId: channelId,
          channel: channelLabel,
          sender: message.username || (await getSenderLabel(message.user, senderCache)) || message.bot_id || "Slack user",
          messageText: text,
          slackTimestamp,
        });
      }

      cursor = payload.response_metadata?.next_cursor || "";
      page += 1;
    } while (cursor && page < 5);
  }

  return enrichWithOpenAI(normalized);
}

async function discoverReadableChannelIds() {
  const ids: string[] = [];
  let cursor = "";

  do {
    const payload = await slackRequest<SlackConversationList>("conversations.list", {
      types: "public_channel,private_channel,im,mpim",
      exclude_archived: "true",
      limit: 200,
      cursor,
    });

    for (const channel of payload.channels || []) {
      if (!channel.id) continue;
      if ((channel.is_channel || channel.is_group) && !channel.is_member) continue;
      ids.push(channel.id);
    }

    cursor = payload.response_metadata?.next_cursor || "";
  } while (cursor && ids.length < 20);

  return Array.from(new Set(ids)).slice(0, 10);
}
function slackTsToIso(ts: string) {
  const seconds = Number(ts.split(".")[0]);
  return new Date(seconds * 1000).toISOString();
}

function addDays(dateText: string, days: number) {
  const date = new Date(`${dateText}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function extractContractFields(text: string, slackTimestamp: string) {
  const lower = text.toLowerCase();
  const slackDate = slackTimestamp.slice(0, 10);
  const dates = Array.from(text.matchAll(DATE_RE)).map(match => match[1]);
  const amountMatch = text.match(AMOUNT_RE);
  const amountText = amountMatch?.[1] || amountMatch?.[2] || "0";
  const amount = Number(amountText.replace(/,/g, "")) || 0;
  const contractId = text.match(CONTRACT_RE)?.[1]?.replace(/\s+/g, "-") || "Unspecified";

  let startDate = dates[0] || slackDate;
  let termDate = dates[1] || addDays(startDate, 365);
  if (dates.length === 1 && /\b(term|end|ending|expires|expiration|renewal)\b/i.test(text)) {
    startDate = slackDate;
    termDate = dates[0];
  }

  return {
    clientName: extractClientName(text),
    contractId,
    hardwareCategory: extractCategory(lower),
    startDate,
    termDate,
    amount,
    currency: "USD",
    riskLevel: extractRisk(lower),
    sentiment: extractSentiment(lower),
    stage: extractStage(lower),
  };
}

function extractClientName(text: string) {
  const beforeVerb = text.match(/^([A-Z][A-Za-z0-9&.' -]{2,80}?)\s+(?:asked|asks|wants|requested|needs|renewal|is|has|expanded|confirmed|flagged|reported)\b/);
  if (beforeVerb?.[1]) return beforeVerb[1].trim();

  const labeled = text.match(/\b(?:client|customer|account|company)\s*[:=-]\s*([A-Z][A-Za-z0-9&.' -]{2,80})/i);
  if (labeled?.[1]) return labeled[1].trim().replace(/[.,;:].*$/, "");

  return "Unknown client";
}

function extractCategory(lower: string) {
  const categories: Array<[string, string[]]> = [
    ["Endpoint refresh", ["laptop", "desktop", "endpoint", "workstation", "monitor", "dock"]],
    ["Network hardware", ["router", "switch", "firewall", "network", "edge"]],
    ["Storage and servers", ["storage", "server", "gpu", "data center", "datacenter"]],
    ["POS and retail hardware", ["pos", "terminal", "printer", "scanner"]],
    ["Security hardware", ["secure", "mfa", "encryption", "security"]],
    ["Support services", ["support", "sla", "warranty", "managed service"]],
  ];
  return categories.find(([, terms]) => terms.some(term => lower.includes(term)))?.[0] || "General contract";
}

function extractRisk(lower: string): RiskLevel {
  if (/\b(critical|blocked|blocker|at risk|churn|cancel|lost|delay award|cannot proceed)\b/.test(lower)) return "Critical";
  if (/\b(risk|concern|competitor|approval pending|legal requested|slipped|delay|escalat)\b/.test(lower)) return "High";
  if (/\b(review|pending|waiting|capacity|inventory|payment|budget|procurement)\b/.test(lower)) return "Medium";
  return "Low";
}

function extractSentiment(lower: string): Sentiment {
  if (/\b(positive|ready to sign|confirmed|approved|excellent|growth|upsell|likes|strong)\b/.test(lower)) return "Positive";
  if (/\b(negative|worried|blocked|risk|delay|competitor|lower|concern|cancel|churn)\b/.test(lower)) return "Negative";
  return "Neutral";
}

function extractStage(lower: string) {
  const stages: Array<[string, string[]]> = [
    ["Legal review", ["legal", "terms", "redline"]],
    ["Approval", ["approval", "approved", "cfo", "executive"]],
    ["Procurement", ["procurement", "purchase order", "po ", "vendor"]],
    ["Security review", ["security", "compliance", "encryption", "mfa"]],
    ["Competitive pricing", ["competitor", "discount", "pricing", "quote"]],
    ["Implementation planning", ["implementation", "install", "rollout", "capacity"]],
    ["Ready to sign", ["ready to sign", "signature", "sign this"]],
    ["Renewal", ["renewal", "term date", "expires", "expiration"]],
  ];
  return stages.find(([, terms]) => terms.some(term => lower.includes(term)))?.[0] || "Message review";
}

async function enrichWithOpenAI(messages: NormalizedSlackMessage[]) {
  if (!process.env.OPENAI_API_KEY || messages.length === 0) return messages;

  const candidates = messages
    .filter(message => message.clientName === "Unknown client" || message.contractId === "Unspecified" || message.amount === 0)
    .slice(0, 50);
  if (candidates.length === 0) return messages;

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "Extract CRM contract fields from Slack messages. Return strict JSON with an items array. Use null for unknown values. Risk must be Low, Medium, High, or Critical. Sentiment must be Positive, Neutral, or Negative.",
        },
        {
          role: "user",
          content: JSON.stringify({
            items: candidates.map(message => ({
              sourceMessageId: message.sourceMessageId,
              text: message.messageText,
              slackTimestamp: message.slackTimestamp,
            })),
          }),
        },
      ],
    });
    const parsed = JSON.parse(response.output_text || "{}") as { items?: AiExtraction[] };
    const byId = new Map((parsed.items || []).map(item => [item.sourceMessageId, item]));

    return messages.map(message => {
      const extracted = byId.get(message.sourceMessageId);
      if (!extracted) return message;
      return {
        ...message,
        clientName: validText(extracted.clientName) || message.clientName,
        contractId: validText(extracted.contractId) || message.contractId,
        hardwareCategory: validText(extracted.hardwareCategory) || message.hardwareCategory,
        startDate: validDate(extracted.startDate) || message.startDate,
        termDate: validDate(extracted.termDate) || message.termDate,
        amount: typeof extracted.amount === "number" && extracted.amount >= 0 ? extracted.amount : message.amount,
        currency: validText(extracted.currency) || message.currency,
        riskLevel: validRisk(extracted.riskLevel) || message.riskLevel,
        sentiment: validSentiment(extracted.sentiment) || message.sentiment,
        stage: validText(extracted.stage) || message.stage,
      };
    });
  } catch {
    return messages;
  }
}

function validText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function validDate(value: unknown) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : "";
}

function validRisk(value: unknown): RiskLevel | "" {
  return value === "Low" || value === "Medium" || value === "High" || value === "Critical" ? value : "";
}

function validSentiment(value: unknown): Sentiment | "" {
  return value === "Positive" || value === "Neutral" || value === "Negative" ? value : "";
}

async function upsertSlackMessages(database: pg.Client, messages: NormalizedSlackMessage[]) {
  for (const message of messages) {
    await database.query(
      `insert into public.slack_contract_messages
        (source_message_id, source_channel_id, slack_sender_id, channel, sender, client_name, contract_id, hardware_category, message_text,
         start_date, term_date, amount, currency, risk_level, sentiment, stage, slack_timestamp, raw_slack_message, updated_at)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::date, $11::date, $12, $13, $14, $15, $16, $17::timestamptz, $18::jsonb, now())
       on conflict (source_message_id) do update set
         source_channel_id = excluded.source_channel_id,
         channel = excluded.channel,
         sender = excluded.sender,
         client_name = excluded.client_name,
         contract_id = excluded.contract_id,
         hardware_category = excluded.hardware_category,
         message_text = excluded.message_text,
         start_date = excluded.start_date,
         term_date = excluded.term_date,
         amount = excluded.amount,
         currency = excluded.currency,
         risk_level = excluded.risk_level,
         sentiment = excluded.sentiment,
         stage = excluded.stage,
         slack_timestamp = excluded.slack_timestamp,
         raw_slack_message = excluded.raw_slack_message,
         updated_at = now()`,
      [
        message.sourceMessageId,
        message.sourceChannelId,
        message.sender,
        message.channel,
        message.sender,
        message.clientName,
        message.contractId,
        message.hardwareCategory,
        message.messageText,
        message.startDate,
        message.termDate,
        message.amount,
        message.currency,
        message.riskLevel,
        message.sentiment,
        message.stage,
        message.slackTimestamp,
        JSON.stringify(message),
      ],
    );
  }
}

function formatDate(value: unknown) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function daysUntil(dateText: string) {
  const today = new Date();
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const target = new Date(`${dateText}T00:00:00Z`).getTime();
  return Math.ceil((target - todayUtc) / 86400000);
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

function keywordCount(messages: Array<{ messageText: string }>, keywords: string[]) {
  return messages.reduce((count, message) => {
    const text = message.messageText.toLowerCase();
    return count + keywords.filter(keyword => text.includes(keyword)).length;
  }, 0);
}

function emptySlackInsights(channelIds: string[]) {
  return {
    messages: [],
    summary: {
      totalMessages: 0,
      totalAmount: 0,
      activeClients: 0,
      highRiskCount: 0,
      negativeCount: 0,
      expiringSoonCount: 0,
    },
    insights: [],
    riskCounts: [],
    categoryInsights: [],
    blockerSignals: [],
    expiringSoon: [],
    topOpportunities: [],
    generatedAt: new Date().toISOString(),
    source: {
      channelIds,
      apiAvailable: false,
    },
  };
}
export async function GET() {
  const database = postgresClient();
  const channelIds = configuredChannelIds();

  try {
    await database.connect();
    await ensureSlackMessages(database);

    let activeChannelIds = channelIds;
    let slackMessages: NormalizedSlackMessage[] = [];
    let slackError = "";

    try {
      slackMessages = await fetchSlackMessages(channelIds);
    } catch (error) {
      slackError = error instanceof Error ? error.message : "Unable to fetch configured Slack conversations.";
    }

    if (slackMessages.length === 0) {
      try {
        const discoveredChannelIds = await discoverReadableChannelIds();
        if (discoveredChannelIds.length > 0 && discoveredChannelIds.join(",") !== channelIds.join(",")) {
          const discoveredMessages = await fetchSlackMessages(discoveredChannelIds);
          if (discoveredMessages.length > 0) {
            activeChannelIds = discoveredChannelIds;
            slackMessages = discoveredMessages;
            slackError = "";
          }
        }
      } catch (error) {
        if (!slackError) slackError = error instanceof Error ? error.message : "Unable to discover readable Slack conversations.";
      }
    }

    await upsertSlackMessages(database, slackMessages);

    const result = await database.query(
      `
      select
        id,
        source_message_id,
        source_channel_id,
        channel,
        sender,
        client_name,
        contract_id,
        hardware_category,
        message_text,
        start_date,
        term_date,
        amount,
        currency,
        risk_level,
        sentiment,
        stage,
        slack_timestamp,
        created_at
      from public.slack_contract_messages
      where source_channel_id = any($1::text[])
      order by slack_timestamp desc
    `,
      [activeChannelIds],
    );

    const messages = result.rows.map(row => ({
      id: row.id as string,
      sourceMessageId: row.source_message_id as string,
      channel: row.channel as string,
      sender: row.sender as string,
      clientName: row.client_name as string,
      contractId: row.contract_id as string,
      hardwareCategory: row.hardware_category as string,
      messageText: row.message_text as string,
      startDate: formatDate(row.start_date),
      termDate: formatDate(row.term_date),
      amount: Number(row.amount),
      currency: row.currency as string,
      riskLevel: row.risk_level as string,
      sentiment: row.sentiment as string,
      stage: row.stage as string,
      slackTimestamp: row.slack_timestamp instanceof Date ? row.slack_timestamp.toISOString() : String(row.slack_timestamp),
      createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
    }));

    const totalAmount = sum(messages.map(message => message.amount));
    const highRiskMessages = messages.filter(message => ["High", "Critical"].includes(message.riskLevel));
    const negativeMessages = messages.filter(message => message.sentiment === "Negative");
    const expiringSoon = messages
      .map(message => ({ ...message, daysToTerm: daysUntil(message.termDate) }))
      .filter(message => message.daysToTerm >= 0 && message.daysToTerm <= 180)
      .sort((a, b) => a.daysToTerm - b.daysToTerm);

    const categoryMap = new Map<string, { category: string; count: number; amount: number }>();
    for (const message of messages) {
      const existing = categoryMap.get(message.hardwareCategory) || { category: message.hardwareCategory, count: 0, amount: 0 };
      existing.count += 1;
      existing.amount += message.amount;
      categoryMap.set(message.hardwareCategory, existing);
    }
    const categoryInsights = Array.from(categoryMap.values()).sort((a, b) => b.amount - a.amount);

    const riskCounts = ["Critical", "High", "Medium", "Low"].map(risk => ({
      risk,
      count: messages.filter(message => message.riskLevel === risk).length,
      amount: sum(messages.filter(message => message.riskLevel === risk).map(message => message.amount)),
    }));

    const blockerSignals = [
      { label: "Approval / legal", count: keywordCount(messages, ["approval", "legal", "forms", "review"]) },
      { label: "Competitive pressure", count: keywordCount(messages, ["competitor", "quote is", "lower", "discount"]) },
      { label: "Supply / delivery", count: keywordCount(messages, ["lead time", "delivery", "inventory", "capacity", "slipped"]) },
      { label: "Budget / payment", count: keywordCount(messages, ["budget", "payment", "fiscal", "funds"]) },
      { label: "Security / compliance", count: keywordCount(messages, ["security", "compliance", "encryption", "mfa"]) },
    ].filter(signal => signal.count > 0).sort((a, b) => b.count - a.count);

    const topOpportunities = messages
      .filter(message => message.sentiment === "Positive" || message.messageText.toLowerCase().includes("growth") || message.messageText.toLowerCase().includes("upsell"))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    const insights = [
      highRiskMessages.length
        ? `${highRiskMessages.length} Slack messages mention High/Critical risk across ${activeChannelIds.length} configured conversations, representing ${highRiskMessages[0].currency} ${sum(highRiskMessages.map(message => message.amount)).toLocaleString()} in contract value.`
        : `No High/Critical Slack risks detected in ${activeChannelIds.length} configured conversations.`,
      expiringSoon.length
        ? `${expiringSoon.length} contracts have term dates inside 180 days; prioritize renewal outreach for ${expiringSoon[0].clientName}.`
        : "No contract term dates fall inside the next 180 days.",
      blockerSignals.length
        ? `The strongest mined blocker theme is ${blockerSignals[0].label.toLowerCase()} with ${blockerSignals[0].count} message signals.`
        : "No repeated blocker theme was detected.",
      topOpportunities.length
        ? `${topOpportunities[0].clientName} is the largest positive opportunity signal at ${topOpportunities[0].currency} ${topOpportunities[0].amount.toLocaleString()}.`
        : "No positive growth or upsell signal detected yet.",
    ];

    return NextResponse.json({
      messages,
      summary: {
        totalMessages: messages.length,
        totalAmount,
        activeClients: new Set(messages.map(message => message.clientName).filter(client => client !== "Unknown client")).size,
        highRiskCount: highRiskMessages.length,
        negativeCount: negativeMessages.length,
        expiringSoonCount: expiringSoon.length,
      },
      insights,
      riskCounts,
      categoryInsights,
      blockerSignals,
      expiringSoon: expiringSoon.slice(0, 5),
      topOpportunities,
      generatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(emptySlackInsights(channelIds));
  } finally {
    await database.end().catch(() => undefined);
  }
}
