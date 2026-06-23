"use client";

import { Icon } from "@iconify/react";
import { FormEvent, useState } from "react";

type Result = {
  filename: string;
  rowCount: number;
  averageScore: number;
  band: string;
  risk: string;
  uploadedMae: number | null;
  bandCounts: Record<string, number>;
  modelMetrics: {
    dataset: { trainingRows: number; testingRows: number };
    model: { mae: number; rmse: number; r2: number };
    maeImprovementPct: number;
  };
  topDrivers: { feature: string; gain: number }[];
  contracts: {
    contractId: string;
    clientName: string;
    predictedScore: number;
    actualScore: number | null;
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
    <section style={{ width: "min(1120px, 100%)", marginTop: 22 }}>
      <div style={{ border: "1px solid #DCE3EC", borderRadius: 14, background: "#fff", padding: 18, boxShadow: "0 2px 8px rgba(15,23,42,.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11, flexWrap: "wrap" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#ECFDF5", display: "grid", placeItems: "center" }}>
            <Icon icon="lucide:gauge" width={20} height={20} style={{ color: "#047857" }} />
          </div>
          <div>
            <p style={{ margin: 0, color: "#047857", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em" }}>XGBoost prediction</p>
            <h3 style={{ margin: "3px 0 0", color: "#111827", fontSize: 17 }}>Deal Health Score</h3>
            <p style={{ margin: "3px 0 0", color: "#6B7280", fontSize: 11 }}>Upload the IT hardware sales workbook to predict portfolio and contract-level health.</p>
          </div>
          <form onSubmit={score} style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <input name="file" type="file" accept=".xlsx,.xls,.csv" required style={{ maxWidth: 310, border: "1px solid #D1D5DB", borderRadius: 8, padding: 8, fontSize: 11 }} />
            <button disabled={busy} style={{ border: 0, borderRadius: 8, background: "#0176D3", color: "#fff", padding: "10px 14px", fontWeight: 700, cursor: busy ? "wait" : "pointer" }}>
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
  const gainTotal = result.topDrivers.reduce((sum, item) => sum + item.gain, 0) || 1;
  return (
    <div style={{ marginTop: 12, border: "1px solid #DCE3EC", borderRadius: 14, background: "#fff", padding: 18, boxShadow: "0 2px 8px rgba(15,23,42,.06)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto minmax(180px,auto)", gap: 20, alignItems: "center" }}>
        <div>
          <p style={{ margin: 0, color: "#6B7280", fontSize: 11 }}>{result.filename} · {result.rowCount.toLocaleString()} contracts</p>
          <h3 style={{ margin: "5px 0 0", color: "#111827", fontSize: 18 }}>Portfolio Deal Health</h3>
        </div>
        <div style={{ width: 112, height: 112, borderRadius: "50%", border: `9px solid ${riskColor(result.risk)}`, display: "grid", placeContent: "center", textAlign: "center" }}>
          <strong style={{ color: "#111827", fontSize: 30, lineHeight: 1 }}>{result.averageScore.toFixed(1)}</strong>
          <span style={{ color: "#9CA3AF", fontSize: 10 }}>/ 100</span>
        </div>
        <div>
          <span style={{ display: "inline-block", borderRadius: 999, background: riskBg(result.risk), color: riskColor(result.risk), padding: "4px 9px", fontSize: 10, fontWeight: 800 }}>{result.band}</span>
          <p style={{ margin: "8px 0 2px", color: "#111827", fontSize: 13, fontWeight: 700 }}>{result.risk} portfolio risk</p>
          <span style={{ color: "#6B7280", fontSize: 10 }}>Model R² {result.modelMetrics.model.r2.toFixed(3)}</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: 8, marginTop: 16 }}>
        <Metric label="Test MAE" value={result.modelMetrics.model.mae.toFixed(2)} />
        <Metric label="Test RMSE" value={result.modelMetrics.model.rmse.toFixed(2)} />
        <Metric label="Baseline gain" value={`${result.modelMetrics.maeImprovementPct.toFixed(1)}%`} />
        <Metric label="Train / Test" value={`${result.modelMetrics.dataset.trainingRows} / ${result.modelMetrics.dataset.testingRows}`} />
        <Metric label="Workbook MAE" value={result.uploadedMae === null ? "N/A" : result.uploadedMae.toFixed(2)} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 18 }}>
        <div>
          <h4 style={{ margin: "0 0 9px", color: "#374151", fontSize: 12 }}>Health distribution</h4>
          {bands.map(band => {
            const count = result.bandCounts[band] || 0;
            return (
              <div key={band} style={{ display: "grid", gridTemplateColumns: "76px 1fr 36px", alignItems: "center", gap: 7, marginBottom: 7, fontSize: 10 }}>
                <span>{band}</span>
                <div style={{ height: 7, borderRadius: 99, background: "#E5E7EB", overflow: "hidden" }}>
                  <i style={{ display: "block", width: `${count / result.rowCount * 100}%`, height: "100%", background: "#0176D3" }} />
                </div>
                <strong style={{ textAlign: "right" }}>{count}</strong>
              </div>
            );
          })}
        </div>
        <div>
          <h4 style={{ margin: "0 0 9px", color: "#374151", fontSize: 12 }}>Top model drivers</h4>
          {result.topDrivers.map(item => (
            <div key={item.feature} style={{ display: "grid", gridTemplateColumns: "155px 1fr", alignItems: "center", gap: 7, marginBottom: 7, fontSize: 10 }}>
              <span>{item.feature}</span>
              <div style={{ height: 7, borderRadius: 99, background: "#E5E7EB", overflow: "hidden" }}>
                <i style={{ display: "block", width: `${item.gain / gainTotal * 100}%`, height: "100%", background: "#10B981" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h4 style={{ margin: "18px 0 8px", color: "#374151", fontSize: 12 }}>Lowest predicted deal health</h4>
      <div style={{ maxHeight: 330, overflow: "auto", border: "1px solid #E5E7EB", borderRadius: 9 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
          <thead><tr>{["Contract", "Client", "Predicted", "Actual", "Band", "Risk"].map(label => <th key={label} style={{ position: "sticky", top: 0, background: "#F9FAFB", color: "#6B7280", padding: 8, textAlign: "left" }}>{label}</th>)}</tr></thead>
          <tbody>{result.contracts.map(item => <tr key={item.contractId}>
            <td style={cell}><strong>{item.contractId}</strong></td><td style={cell}>{item.clientName}</td><td style={cell}>{item.predictedScore.toFixed(1)}</td><td style={cell}>{item.actualScore?.toFixed(1) ?? "—"}</td><td style={cell}>{item.band}</td><td style={cell}>{item.risk}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

const cell = { borderTop: "1px solid #EEF2F7", padding: 8 } as const;

function Metric({ label, value }: { label: string; value: string }) {
  return <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, background: "#F9FAFB", padding: 9 }}><span style={{ display: "block", color: "#9CA3AF", fontSize: 8, fontWeight: 800, textTransform: "uppercase" }}>{label}</span><strong style={{ display: "block", marginTop: 4, color: "#111827", fontSize: 16 }}>{value}</strong></div>;
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
