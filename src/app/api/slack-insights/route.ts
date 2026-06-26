import { NextResponse } from "next/server";
import pg from "pg";

export const runtime = "nodejs";

type SlackSeedMessage = {
  sourceMessageId: string;
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
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  sentiment: "Positive" | "Neutral" | "Negative";
  stage: string;
  slackTimestamp: string;
};

const SAMPLE_MESSAGES: SlackSeedMessage[] = [
  {
    sourceMessageId: "slack-it-hw-0001",
    channel: "#enterprise-renewals",
    sender: "Maya Chen",
    clientName: "Silverline Bank",
    contractId: "HW-2026-0142",
    hardwareCategory: "Endpoint refresh",
    messageText:
      "Silverline Bank asked for final pricing on 420 ThinkPad laptops, docks, and warranty uplifts. Start date 2026-07-01, term ends 2027-06-30, amount $684,000. Procurement is positive but CFO approval is still pending this week.",
    startDate: "2026-07-01",
    termDate: "2027-06-30",
    amount: 684000,
    currency: "USD",
    riskLevel: "High",
    sentiment: "Neutral",
    stage: "CFO approval",
    slackTimestamp: "2026-06-18T14:24:00Z",
  },
  {
    sourceMessageId: "slack-it-hw-0002",
    channel: "#network-deals",
    sender: "Andre Patel",
    clientName: "NorthBridge Technology",
    contractId: "HW-2026-0178",
    hardwareCategory: "Firewall and switches",
    messageText:
      "NorthBridge wants 18 firewalls and 44 managed switches for the branch modernization. Contract start 2026-08-15, term 24 months ending 2028-08-14, amount $912,500. Legal requested stronger replacement SLA language before signature.",
    startDate: "2026-08-15",
    termDate: "2028-08-14",
    amount: 912500,
    currency: "USD",
    riskLevel: "Medium",
    sentiment: "Neutral",
    stage: "Legal review",
    slackTimestamp: "2026-06-19T16:05:00Z",
  },
  {
    sourceMessageId: "slack-it-hw-0003",
    channel: "#hardware-pipeline",
    sender: "Lena Brooks",
    clientName: "BluePeak IT Solutions",
    contractId: "HW-2026-0191",
    hardwareCategory: "Storage array",
    messageText:
      "BluePeak expanded the storage array ask from 280TB to 420TB after the DR workshop. Start date 2026-09-01, term date 2029-08-31, amount $1,340,000. Strong executive sponsor; upsell likely if implementation slots are protected.",
    startDate: "2026-09-01",
    termDate: "2029-08-31",
    amount: 1340000,
    currency: "USD",
    riskLevel: "Low",
    sentiment: "Positive",
    stage: "Expansion proposal",
    slackTimestamp: "2026-06-20T13:45:00Z",
  },
  {
    sourceMessageId: "slack-it-hw-0004",
    channel: "#deal-desk",
    sender: "Jon Rivera",
    clientName: "Apex Manufacturing",
    contractId: "HW-2026-0207",
    hardwareCategory: "Rugged tablets",
    messageText:
      "Apex Manufacturing needs 260 rugged tablets for warehouse scanning. Start 2026-07-20, term ending 2028-07-19, contract amount $416,800. Competitor quote is 6% lower; we need bundle discount approval by Friday.",
    startDate: "2026-07-20",
    termDate: "2028-07-19",
    amount: 416800,
    currency: "USD",
    riskLevel: "High",
    sentiment: "Negative",
    stage: "Competitive pricing",
    slackTimestamp: "2026-06-21T18:12:00Z",
  },
  {
    sourceMessageId: "slack-it-hw-0005",
    channel: "#enterprise-renewals",
    sender: "Priya Shah",
    clientName: "Greenfield Clinics",
    contractId: "HW-2026-0224",
    hardwareCategory: "Clinical workstations",
    messageText:
      "Greenfield Clinics renewal covers 180 clinical workstations, privacy screens, and 3-year support. Start date 2026-07-10, term date 2029-07-09, amount $522,750. Client asked to add encryption-ready configuration for compliance.",
    startDate: "2026-07-10",
    termDate: "2029-07-09",
    amount: 522750,
    currency: "USD",
    riskLevel: "Medium",
    sentiment: "Positive",
    stage: "Security configuration",
    slackTimestamp: "2026-06-22T12:33:00Z",
  },
  {
    sourceMessageId: "slack-it-hw-0006",
    channel: "#supply-chain-alerts",
    sender: "Noah Williams",
    clientName: "Harbor Logistics",
    contractId: "HW-2026-0236",
    hardwareCategory: "Network edge devices",
    messageText:
      "Harbor Logistics is blocked by delivery timing for 96 edge routers. Contract start 2026-07-01, term 18 months ending 2027-12-31, amount $308,400. Vendor lead time slipped 21 days; client is worried about depot rollout.",
    startDate: "2026-07-01",
    termDate: "2027-12-31",
    amount: 308400,
    currency: "USD",
    riskLevel: "Critical",
    sentiment: "Negative",
    stage: "Supply delay",
    slackTimestamp: "2026-06-23T15:58:00Z",
  },
  {
    sourceMessageId: "slack-it-hw-0007",
    channel: "#hardware-pipeline",
    sender: "Elena Garcia",
    clientName: "Summit Retail Group",
    contractId: "HW-2026-0249",
    hardwareCategory: "POS terminals",
    messageText:
      "Summit Retail wants 740 POS terminals and receipt printers before holiday freeze. Start date 2026-08-01, term date 2028-07-31, amount $1,118,250. Budget owner confirmed funds; risk is installation capacity.",
    startDate: "2026-08-01",
    termDate: "2028-07-31",
    amount: 1118250,
    currency: "USD",
    riskLevel: "Medium",
    sentiment: "Positive",
    stage: "Implementation planning",
    slackTimestamp: "2026-06-24T11:10:00Z",
  },
  {
    sourceMessageId: "slack-it-hw-0008",
    channel: "#deal-desk",
    sender: "Sam Okafor",
    clientName: "Vertex Insurance",
    contractId: "HW-2026-0255",
    hardwareCategory: "VDI thin clients",
    messageText:
      "Vertex Insurance requested 530 VDI thin clients, monitors, and extended support. Start 2026-09-15, term ending 2029-09-14, amount $789,600. Security team likes the design, but procurement wants payment split across two fiscal quarters.",
    startDate: "2026-09-15",
    termDate: "2029-09-14",
    amount: 789600,
    currency: "USD",
    riskLevel: "Medium",
    sentiment: "Neutral",
    stage: "Payment terms",
    slackTimestamp: "2026-06-24T20:22:00Z",
  },
  {
    sourceMessageId: "slack-it-hw-0009",
    channel: "#network-deals",
    sender: "Grace Kim",
    clientName: "Cobalt Energy",
    contractId: "HW-2026-0263",
    hardwareCategory: "Data center servers",
    messageText:
      "Cobalt Energy is ready to sign for 36 GPU-capable servers if we preserve the quoted price through month end. Start date 2026-10-01, term 36 months ending 2029-09-30, amount $2,420,000. Excellent signal from CIO sponsor.",
    startDate: "2026-10-01",
    termDate: "2029-09-30",
    amount: 2420000,
    currency: "USD",
    riskLevel: "Low",
    sentiment: "Positive",
    stage: "Ready to sign",
    slackTimestamp: "2026-06-25T09:18:00Z",
  },
  {
    sourceMessageId: "slack-it-hw-0010",
    channel: "#enterprise-renewals",
    sender: "Diego Santos",
    clientName: "MetroGov Services",
    contractId: "HW-2026-0276",
    hardwareCategory: "Secure laptops",
    messageText:
      "MetroGov Services renewal for 310 secure laptops is at risk. Start 2026-07-05, term date 2027-07-04, amount $495,500. Public-sector compliance review added extra forms and the client may delay award until August.",
    startDate: "2026-07-05",
    termDate: "2027-07-04",
    amount: 495500,
    currency: "USD",
    riskLevel: "Critical",
    sentiment: "Negative",
    stage: "Compliance review",
    slackTimestamp: "2026-06-25T17:50:00Z",
  },
  {
    sourceMessageId: "slack-it-hw-0011",
    channel: "#supply-chain-alerts",
    sender: "Hannah Lee",
    clientName: "Orion Media",
    contractId: "HW-2026-0281",
    hardwareCategory: "Creative workstations",
    messageText:
      "Orion Media asked whether we can add 75 high-end creative workstations to the current quote. Start date 2026-08-10, term ending 2028-08-09, amount $612,900. This is a growth signal, but GPU inventory must be reserved now.",
    startDate: "2026-08-10",
    termDate: "2028-08-09",
    amount: 612900,
    currency: "USD",
    riskLevel: "Medium",
    sentiment: "Positive",
    stage: "Inventory reservation",
    slackTimestamp: "2026-06-26T10:42:00Z",
  },
];

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

  for (const message of SAMPLE_MESSAGES) {
    await database.query(
      `insert into public.slack_contract_messages
        (source_message_id, channel, sender, client_name, contract_id, hardware_category, message_text,
         start_date, term_date, amount, currency, risk_level, sentiment, stage, slack_timestamp)
       values ($1, $2, $3, $4, $5, $6, $7, $8::date, $9::date, $10, $11, $12, $13, $14, $15::timestamptz)
       on conflict (source_message_id) do nothing`,
      [
        message.sourceMessageId,
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

export async function GET() {
  const database = postgresClient();
  try {
    await database.connect();
    await ensureSlackMessages(database);

    const result = await database.query(`
      select
        id,
        source_message_id,
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
      order by slack_timestamp desc
    `);

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
      { label: "Competitive pressure", count: keywordCount(messages, ["competitor", "quote is", "lower"]) },
      { label: "Supply / delivery", count: keywordCount(messages, ["lead time", "delivery", "inventory", "capacity"]) },
      { label: "Budget / payment", count: keywordCount(messages, ["budget", "payment", "fiscal", "funds"]) },
      { label: "Security / compliance", count: keywordCount(messages, ["security", "compliance", "encryption"]) },
    ].filter(signal => signal.count > 0).sort((a, b) => b.count - a.count);

    const topOpportunities = messages
      .filter(message => message.sentiment === "Positive" || message.messageText.toLowerCase().includes("growth") || message.messageText.toLowerCase().includes("upsell"))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    const insights = [
      highRiskMessages.length
        ? `${highRiskMessages.length} Slack messages mention High/Critical risk, representing ${highRiskMessages[0].currency} ${sum(highRiskMessages.map(message => message.amount)).toLocaleString()} in contract value.`
        : "No High/Critical Slack risks detected in the current message set.",
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
        activeClients: new Set(messages.map(message => message.clientName)).size,
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
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load Slack insights." },
      { status: 500 },
    );
  } finally {
    await database.end().catch(() => undefined);
  }
}
