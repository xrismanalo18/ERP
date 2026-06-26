"use client";

import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";

type SlackMessage = {
  id: string;
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
  riskLevel: string;
  sentiment: string;
  stage: string;
  slackTimestamp: string;
  createdAt: string;
  daysToTerm?: number;
};

type SlackInsightsResponse = {
  messages: SlackMessage[];
  summary: {
    totalMessages: number;
    totalAmount: number;
    activeClients: number;
    highRiskCount: number;
    negativeCount: number;
    expiringSoonCount: number;
  };
  insights: string[];
  riskCounts: Array<{ risk: string; count: number; amount: number }>;
  categoryInsights: Array<{ category: string; count: number; amount: number }>;
  blockerSignals: Array<{ label: string; count: number }>;
  expiringSoon: SlackMessage[];
  topOpportunities: SlackMessage[];
  generatedAt: string;
};

const riskStyles: Record<string, { bg: string; color: string; border: string }> = {
  Critical: { bg: "#FEE2E2", color: "#991B1B", border: "#FCA5A5" },
  High: { bg: "#FFEDD5", color: "#9A3412", border: "#FDBA74" },
  Medium: { bg: "#FEF3C7", color: "#92400E", border: "#FCD34D" },
  Low: { bg: "#DCFCE7", color: "#166534", border: "#86EFAC" },
};

const sentimentStyles: Record<string, { bg: string; color: string }> = {
  Positive: { bg: "#DCFCE7", color: "#047857" },
  Neutral: { bg: "#E0F2FE", color: "#0369A1" },
  Negative: { bg: "#FEE2E2", color: "#B91C1C" },
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T00:00:00`));
}

function StatCard({ label, value, icon, accent }: { label: string; value: string; icon: string; accent: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #DDE7F3", borderRadius: 16, padding: 18, boxShadow: "0 12px 30px rgba(15, 23, 42, 0.05)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 34, height: 34, borderRadius: 12, display: "grid", placeItems: "center", background: accent }}>
          <Icon icon={icon} width={17} height={17} style={{ color: "#fff" }} />
        </span>
        <span style={{ color: "#64748B", fontSize: 11, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>{label}</span>
      </div>
      <div style={{ marginTop: 14, color: "#0F172A", fontSize: 24, fontWeight: 800 }}>{value}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ background: "#fff", border: "1px solid #DDE7F3", borderRadius: 18, padding: 18, boxShadow: "0 12px 30px rgba(15, 23, 42, 0.045)" }}>
      <h3 style={{ margin: "0 0 14px", color: "#0F172A", fontSize: 16, fontWeight: 800 }}>{title}</h3>
      {children}
    </section>
  );
}

function BarRow({ label, value, max, color, suffix = "" }: { label: string; value: number; max: number; color: string; suffix?: string }) {
  const width = max > 0 ? Math.max(4, Math.round((value / max) * 100)) : 0;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "150px 1fr 84px", gap: 12, alignItems: "center", marginBottom: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: "#475569" }}>{label}</span>
      <span style={{ height: 9, borderRadius: 99, background: "#E2E8F0", overflow: "hidden" }}>
        <span style={{ display: "block", height: "100%", width: `${width}%`, borderRadius: 99, background: color }} />
      </span>
      <span style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", textAlign: "right" }}>{value.toLocaleString()}{suffix}</span>
    </div>
  );
}

export default function SlackInsightsView() {
  const [data, setData] = useState<SlackInsightsResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/slack-insights", { cache: "no-store" });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Unable to load Slack insights.");
        if (!cancelled) setData(payload);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unable to load Slack insights.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const maxRiskAmount = useMemo(() => Math.max(1, ...(data?.riskCounts || []).map(item => item.amount)), [data]);
  const maxCategoryAmount = useMemo(() => Math.max(1, ...(data?.categoryInsights || []).map(item => item.amount)), [data]);
  const maxBlockers = useMemo(() => Math.max(1, ...(data?.blockerSignals || []).map(item => item.count)), [data]);

  if (loading) {
    return (
      <div style={{ height: "calc(100vh - 48px)", display: "grid", placeItems: "center", background: "#F3F4F6", color: "#475569", fontWeight: 700 }}>
        Loading Slack contract mining insights…
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ height: "calc(100vh - 48px)", display: "grid", placeItems: "center", background: "#F3F4F6", padding: 24 }}>
        <div style={{ maxWidth: 520, background: "#fff", border: "1px solid #FCA5A5", borderRadius: 18, padding: 22, color: "#991B1B" }}>
          <h2 style={{ margin: "0 0 8px", fontSize: 18 }}>Slack Insights could not load</h2>
          <p style={{ margin: 0, color: "#7F1D1D" }}>{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div style={{ height: "calc(100vh - 48px)", overflowY: "auto", background: "linear-gradient(180deg, #F8FBFF 0%, #F3F4F6 55%)", padding: 24 }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 18, alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 999, background: "#E0F2FE", color: "#0369A1", fontSize: 12, fontWeight: 800 }}>
              <Icon icon="lucide:message-square-text" width={14} height={14} />
              Slack data mining from PostgreSQL
            </div>
            <h1 style={{ margin: "12px 0 6px", color: "#0F172A", fontSize: 30, lineHeight: 1.1 }}>Slack Insights</h1>
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{ border: "1px solid #BFDBFE", background: "#fff", color: "#0369A1", borderRadius: 12, padding: "10px 12px", fontSize: 12, fontWeight: 800, cursor: "pointer" }}
          >
            Refresh insights
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 12, marginBottom: 18 }}>
          <StatCard label="Slack messages" value={String(data.summary.totalMessages)} icon="lucide:message-circle" accent="#2563EB" />
          <StatCard label="Mined contract value" value={formatCurrency(data.summary.totalAmount)} icon="lucide:badge-dollar-sign" accent="#059669" />
          <StatCard label="Clients detected" value={String(data.summary.activeClients)} icon="lucide:building-2" accent="#7C3AED" />
          <StatCard label="High/Critical" value={String(data.summary.highRiskCount)} icon="lucide:triangle-alert" accent="#DC2626" />
          <StatCard label="Expiring soon" value={String(data.summary.expiringSoonCount)} icon="lucide:calendar-clock" accent="#EA580C" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 16, marginBottom: 16 }}>
          <Panel title="Client-facing mined insights">
            <div style={{ display: "grid", gap: 10 }}>
              {data.insights.map((insight, index) => (
                <div key={insight} style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: 10, alignItems: "start", padding: 12, borderRadius: 14, background: index === 0 ? "#FEF2F2" : "#F8FAFC", border: `1px solid ${index === 0 ? "#FECACA" : "#E2E8F0"}` }}>
                  <span style={{ width: 28, height: 28, borderRadius: 10, display: "grid", placeItems: "center", background: index === 0 ? "#DC2626" : "#0EA5E9", color: "#fff", fontSize: 12, fontWeight: 900 }}>{index + 1}</span>
                  <span style={{ color: "#334155", fontSize: 13, lineHeight: 1.55, fontWeight: 650 }}>{insight}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Blocker signals mined from message text">
            {data.blockerSignals.map(signal => (
              <BarRow key={signal.label} label={signal.label} value={signal.count} max={maxBlockers} color="#0EA5E9" />
            ))}
          </Panel>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <Panel title="Contract value by risk">
            {data.riskCounts.map(item => (
              <BarRow
                key={item.risk}
                label={`${item.risk} (${item.count})`}
                value={item.amount}
                max={maxRiskAmount}
                color={riskStyles[item.risk]?.color || "#64748B"}
                suffix=""
              />
            ))}
          </Panel>

          <Panel title="Top hardware categories by value">
            {data.categoryInsights.slice(0, 6).map(item => (
              <BarRow key={item.category} label={`${item.category} (${item.count})`} value={item.amount} max={maxCategoryAmount} color="#10B981" />
            ))}
          </Panel>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 16, marginBottom: 16 }}>
          <Panel title="Renewal / term-date watch">
            {data.expiringSoon.length === 0 ? (
              <p style={{ margin: 0, color: "#64748B", fontSize: 13 }}>No contracts are inside the 180-day term-date watch window.</p>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {data.expiringSoon.map(message => (
                  <div key={message.id} style={{ padding: 12, borderRadius: 14, background: "#FFF7ED", border: "1px solid #FED7AA" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <strong style={{ color: "#0F172A", fontSize: 13 }}>{message.clientName}</strong>
                      <span style={{ color: "#C2410C", fontSize: 12, fontWeight: 800 }}>{message.daysToTerm} days</span>
                    </div>
                    <div style={{ color: "#64748B", fontSize: 12, marginTop: 4 }}>{message.contractId} · Term date {formatDate(message.termDate)}</div>
                  </div>
                ))}
              </div>
            )}
          </Panel>

          <Panel title="Largest positive opportunity signals">
            <div style={{ display: "grid", gap: 10 }}>
              {data.topOpportunities.map(message => (
                <div key={message.id} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, padding: 12, borderRadius: 14, background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
                  <div>
                    <div style={{ color: "#0F172A", fontSize: 13, fontWeight: 800 }}>{message.clientName}</div>
                    <div style={{ color: "#64748B", fontSize: 12, marginTop: 4 }}>{message.hardwareCategory} · {message.stage}</div>
                  </div>
                  <strong style={{ color: "#047857", fontSize: 13 }}>{formatCurrency(message.amount)}</strong>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <Panel title="Latest Slack contract messages from PostgreSQL">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: 980 }}>
              <thead>
                <tr>
                  {["Client", "Contract", "Category", "Dates", "Amount", "Risk", "Sentiment", "Stage", "Message"].map(header => (
                    <th key={header} style={{ textAlign: "left", padding: "10px 10px", color: "#64748B", fontSize: 11, textTransform: "uppercase", letterSpacing: ".06em", borderBottom: "1px solid #E2E8F0" }}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.messages.map(message => {
                  const risk = riskStyles[message.riskLevel] || riskStyles.Medium;
                  const sentiment = sentimentStyles[message.sentiment] || sentimentStyles.Neutral;
                  return (
                    <tr key={message.id}>
                      <td style={{ padding: 10, borderBottom: "1px solid #EEF2F7", color: "#0F172A", fontSize: 13, fontWeight: 800 }}>{message.clientName}</td>
                      <td style={{ padding: 10, borderBottom: "1px solid #EEF2F7", color: "#475569", fontSize: 12 }}>{message.contractId}</td>
                      <td style={{ padding: 10, borderBottom: "1px solid #EEF2F7", color: "#475569", fontSize: 12 }}>{message.hardwareCategory}</td>
                      <td style={{ padding: 10, borderBottom: "1px solid #EEF2F7", color: "#475569", fontSize: 12 }}>{formatDate(message.startDate)} → {formatDate(message.termDate)}</td>
                      <td style={{ padding: 10, borderBottom: "1px solid #EEF2F7", color: "#0F172A", fontSize: 12, fontWeight: 800 }}>{formatCurrency(message.amount)}</td>
                      <td style={{ padding: 10, borderBottom: "1px solid #EEF2F7" }}>
                        <span style={{ display: "inline-flex", borderRadius: 999, border: `1px solid ${risk.border}`, background: risk.bg, color: risk.color, padding: "4px 9px", fontSize: 11, fontWeight: 900 }}>{message.riskLevel}</span>
                      </td>
                      <td style={{ padding: 10, borderBottom: "1px solid #EEF2F7" }}>
                        <span style={{ display: "inline-flex", borderRadius: 999, background: sentiment.bg, color: sentiment.color, padding: "4px 9px", fontSize: 11, fontWeight: 900 }}>{message.sentiment}</span>
                      </td>
                      <td style={{ padding: 10, borderBottom: "1px solid #EEF2F7", color: "#475569", fontSize: 12 }}>{message.stage}</td>
                      <td style={{ padding: 10, borderBottom: "1px solid #EEF2F7", color: "#334155", fontSize: 12, lineHeight: 1.45, maxWidth: 420 }}>{message.messageText}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
}
