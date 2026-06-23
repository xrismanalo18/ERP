"use client";

import { Icon } from "@iconify/react";
import { FormEvent, useState } from "react";

type Result = {
  filename: string;
  rowCount: number;
  averageScore: number;
  band: string;
  risk: string;
  bandCounts: Record<string, number>;
  topDrivers: { feature: string; impact: number; percentage: number }[];
  contracts: {
    contractId: string;
    clientName: string;
    predictedScore: number;
    band: string;
    risk: string;
  }[];
};

const bands = ["Excellent", "Healthy", "Watch List", "At Risk", "Critical"];

export default function DealHealthPanel() {
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function score(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/deal-health", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Unable to score contracts.");
      setResult(body);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to score contracts.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section style={{ width: "min(1120px, 100%)", margin: "0 auto" }}>
      <div style={{ border: "1px solid #DCE3EC", borderRadius: 16, background: "#fff", padding: 20, boxShadow: "0 8px 24px rgba(15,23,42,.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#D1FAE5,#DBEAFE)", display: "grid", placeItems: "center" }}>
            <Icon icon="lucide:gauge" width={22} height={22} style={{ color: "#047857" }} />
          </div>
          <div>
            <p style={{ margin: 0, color: "#047857", fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".09em" }}>XGBoost prediction</p>
            <h3 style={{ margin: "3px 0 0", color: "#0F172A", fontSize: 19 }}>Deal Health Score</h3>
            <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: 11 }}>Predict portfolio and contract-level health from the IT hardware sales workbook.</p>
          </div>
          <form onSubmit={score} style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <input name="file" type="file" accept=".xlsx,.xls,.csv" required style={{ maxWidth: 310, border: "1px solid #CBD5E1", borderRadius: 9, padding: 8, fontSize: 11, background: "#F8FAFC" }} />
            <button disabled={busy} style={{ border: 0, borderRadius: 9, background: "linear-gradient(135deg,#0176D3,#0F5CA8)", color: "#fff", padding: "10px 15px", fontWeight: 800, boxShadow: "0 4px 10px rgba(1,118,211,.24)", cursor: busy ? "wait" : "pointer" }}>
              {busy ? "Scoring..." : "Predict health"}
            </button>
          </form>
        </div>
        {error && <p style={{ margin: "12px 0 0", borderRadius: 8, background: "#FEF2F2", color: "#B91C1C", padding: 9, fontSize: 11 }}>{error}</p>}
      </div>
      {result && <Results result={result} />}
    </section>
  );
}

function Results({ result }: { result: Result }) {
  const criticalCount = result.bandCounts.Critical || 0;
  const atRiskCount = result.bandCounts["At Risk"] || 0;
  const watchCount = result.bandCounts["Watch List"] || 0;
  const healthyCount = (result.bandCounts.Healthy || 0) + (result.bandCounts.Excellent || 0);
  const highRiskCount = criticalCount + atRiskCount;
  return (
    <div style={{ marginTop: 14, border: "1px solid #DCE3EC", borderRadius: 16, background: "linear-gradient(180deg,#FFFFFF,#F8FAFC)", padding: 20, boxShadow: "0 10px 30px rgba(15,23,42,.08)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto minmax(180px,auto)", gap: 22, alignItems: "center" }}>
        <div>
          <p style={{ margin: 0, color: "#64748B", fontSize: 11 }}>{result.filename} · {result.rowCount.toLocaleString()} contracts</p>
          <h3 style={{ margin: "5px 0 0", color: "#0F172A", fontSize: 20 }}>Portfolio Deal Health</h3>
        </div>
        <div style={{ width: 116, height: 116, borderRadius: "50%", border: `9px solid ${riskColor(result.risk)}`, background: riskSoftBg(result.risk), display: "grid", placeContent: "center", textAlign: "center", boxShadow: `0 0 0 6px ${riskBg(result.risk)}` }}>
          <strong style={{ color: "#0F172A", fontSize: 32, lineHeight: 1 }}>{result.averageScore.toFixed(1)}</strong>
          <span style={{ color: "#64748B", fontSize: 10 }}>/ 100</span>
        </div>
        <div>
          <BandBadge band={result.band} />
          <p style={{ margin: "9px 0 3px", color: "#0F172A", fontSize: 14, fontWeight: 800 }}>{result.risk} portfolio risk</p>
          <span style={{ color: "#64748B", fontSize: 10 }}>Calculated from this uploaded workbook only</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 10, marginTop: 20 }}>
        <Metric label="Uploaded contracts" value={result.rowCount.toLocaleString()} />
        <Metric label="Critical + At Risk" value={highRiskCount.toLocaleString()} tone="#C2410C" />
        <Metric label="Watch List" value={watchCount.toLocaleString()} tone="#B45309" />
        <Metric label="Healthy + Excellent" value={healthyCount.toLocaleString()} tone="#047857" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 20 }}>
        <div style={panelStyle}>
          <h4 style={sectionTitle}>Health distribution from uploaded workbook</h4>
          {bands.map(band => {
            const count = result.bandCounts[band] || 0;
            return (
              <div key={band} style={{ display: "grid", gridTemplateColumns: "90px 1fr 36px", alignItems: "center", gap: 8, marginBottom: 9 }}>
                <BandBadge band={band} compact />
                <div style={{ height: 8, borderRadius: 99, background: "#E2E8F0", overflow: "hidden" }}>
                  <i style={{ display: "block", width: `${count / result.rowCount * 100}%`, height: "100%", background: bandColor(band) }} />
                </div>
                <strong style={{ color: "#334155", textAlign: "right", fontSize: 10 }}>{count}</strong>
              </div>
            );
          })}
        </div>
        <div style={panelStyle}>
          <h4 style={sectionTitle}>Score drivers from uploaded workbook</h4>
          {result.topDrivers.map(item => (
            <div key={item.feature} style={{ display: "grid", gridTemplateColumns: "155px 1fr 42px", alignItems: "center", gap: 8, marginBottom: 9, fontSize: 10 }}>
              <span style={{ color: "#475569" }}>{item.feature}</span>
              <div style={{ height: 8, borderRadius: 99, background: "#E2E8F0", overflow: "hidden" }}>
                <i style={{ display: "block", width: `${item.percentage}%`, height: "100%", background: "linear-gradient(90deg,#0EA5E9,#10B981)" }} />
              </div>
              <strong style={{ color: "#0F766E", textAlign: "right", fontSize: 10 }}>{item.percentage.toFixed(1)}%</strong>
            </div>
          ))}
          <p style={{ margin: "10px 0 0", color: "#94A3B8", fontSize: 9, lineHeight: 1.45 }}>
            Percentages show each field&apos;s relative score sensitivity across contracts in this uploaded file.
          </p>
        </div>
      </div>

      <h4 style={{ ...sectionTitle, marginTop: 20 }}>All uploaded contracts · lowest to highest score</h4>
      <div style={{ maxHeight: 390, overflow: "auto", border: "1px solid #DCE3EC", borderRadius: 12, background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: 11 }}>
          <thead>
            <tr>{["Contract", "Client", "Predicted Score", "Health Band", "Risk"].map(label => <th key={label} style={{ position: "sticky", top: 0, zIndex: 1, background: "#F1F5F9", color: "#475569", padding: "10px 12px", textAlign: "left", textTransform: "uppercase", letterSpacing: ".04em", fontSize: 9 }}>{label}</th>)}</tr>
          </thead>
          <tbody>{result.contracts.map(item => (
            <tr key={item.contractId} style={{ background: bandRowBg(item.band) }}>
              <td style={{ ...cell, borderLeft: `4px solid ${bandColor(item.band)}` }}><strong style={{ color: "#0F172A" }}>{item.contractId}</strong></td>
              <td style={cell}>{item.clientName}</td>
              <td style={cell}><span style={{ display: "inline-grid", placeItems: "center", minWidth: 50, borderRadius: 8, background: bandColor(item.band), color: "#fff", padding: "5px 8px", fontSize: 12, fontWeight: 900 }}>{item.predictedScore.toFixed(1)}</span></td>
              <td style={cell}><BandBadge band={item.band} /></td>
              <td style={cell}><RiskBadge risk={item.risk} /></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

const cell = { borderTop: "1px solid #E2E8F0", padding: "10px 12px", color: "#334155" } as const;
const panelStyle = { border: "1px solid #E2E8F0", borderRadius: 12, background: "#fff", padding: 14 } as const;
const sectionTitle = { margin: "0 0 11px", color: "#334155", fontSize: 12, fontWeight: 800 } as const;

function Metric({ label, value, tone = "#0F172A" }: { label: string; value: string; tone?: string }) {
  return <div style={{ border: "1px solid #DCE3EC", borderRadius: 10, background: "#fff", padding: 11, boxShadow: "0 2px 5px rgba(15,23,42,.04)" }}><span style={{ display: "block", color: "#64748B", fontSize: 8, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".05em" }}>{label}</span><strong style={{ display: "block", marginTop: 5, color: tone, fontSize: 18 }}>{value}</strong></div>;
}

function BandBadge({ band, compact = false }: { band: string; compact?: boolean }) {
  return <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 999, background: bandBg(band), color: bandColor(band), border: `1px solid ${bandBorder(band)}`, padding: compact ? "2px 6px" : "4px 9px", fontSize: compact ? 8 : 10, fontWeight: 900, whiteSpace: "nowrap" }}>{band}</span>;
}

function RiskBadge({ risk }: { risk: string }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, borderRadius: 999, background: riskBg(risk), color: riskColor(risk), padding: "4px 9px", fontSize: 10, fontWeight: 900 }}><i style={{ width: 6, height: 6, borderRadius: "50%", background: riskColor(risk) }} />{risk}</span>;
}

function bandColor(band: string) {
  if (band === "Critical") return "#B91C1C";
  if (band === "At Risk") return "#C2410C";
  if (band === "Watch List") return "#B45309";
  if (band === "Healthy") return "#047857";
  return "#1D4ED8";
}

function bandBg(band: string) {
  if (band === "Critical") return "#FEE2E2";
  if (band === "At Risk") return "#FFEDD5";
  if (band === "Watch List") return "#FEF3C7";
  if (band === "Healthy") return "#D1FAE5";
  return "#DBEAFE";
}

function bandBorder(band: string) {
  if (band === "Critical") return "#FCA5A5";
  if (band === "At Risk") return "#FDBA74";
  if (band === "Watch List") return "#FCD34D";
  if (band === "Healthy") return "#6EE7B7";
  return "#93C5FD";
}

function bandRowBg(band: string) {
  if (band === "Critical") return "#FFF7F7";
  if (band === "At Risk") return "#FFF9F5";
  if (band === "Watch List") return "#FFFCF2";
  if (band === "Healthy") return "#F5FFFA";
  return "#F6F9FF";
}

function riskColor(risk: string) {
  if (risk === "Critical") return "#B91C1C";
  if (risk === "High") return "#C2410C";
  if (risk === "Medium") return "#B45309";
  return "#047857";
}

function riskBg(risk: string) {
  if (risk === "Critical") return "#FEE2E2";
  if (risk === "High") return "#FFEDD5";
  if (risk === "Medium") return "#FEF3C7";
  return "#D1FAE5";
}

function riskSoftBg(risk: string) {
  if (risk === "Critical") return "#FFF1F2";
  if (risk === "High") return "#FFF7ED";
  if (risk === "Medium") return "#FFFBEB";
  return "#ECFDF5";
}
