"use client";
import { Icon } from "@iconify/react";
import { useState, useRef } from "react";

type Msg = { role: "user" | "ai"; text: string };

const QA: Record<string, string> = {
  "contract value": "The total contract value is **$280,000 USD** for a 24-month term, with a scheduled annual increase of 5% beginning in Year 2 (effective January 1, 2027).",
  "expire": "The contract effective date is **January 1, 2026** and it expires **December 31, 2027** unless renewed or terminated pursuant to Section 12.1.",
  "payment": "Per Section 5.2, payment is due **Net 30** from invoice date. Late payments accrue 1.5% interest per month. Invoices are issued quarterly in advance.",
  "renewal": "Yes — Section 12.3 includes an **automatic renewal clause**. The contract auto-renews for successive 12-month terms unless either party provides written notice at least **60 days prior** to the expiration date.",
  "termination": "Section 12.1 allows termination for cause with **30 days written notice**. Section 12.2 allows termination for convenience with **90 days written notice**, subject to an early termination fee of 20% of remaining contract value.",
  "sla": "Section 8: **99.5% uptime** guarantee per calendar month, **4-hour response time** for P1 incidents, **8-hour resolution** for P2. SLA breach credits are 5% of monthly fees per incident.",
  "privacy": "Section 10 references **GDPR**, **CCPA**, and the **Data Privacy Act of 2012 (Philippines)**. The vendor must notify the customer within **72 hours** of any confirmed data breach.",
  "gap": "I identified **3 potential contract gaps**:\n1. **Budget owner** is not named — no procurement or finance approver is identified.\n2. **Renewal blocker clause** is missing — no provision for disputes at renewal time.\n3. **Scope of use** is vague in Section 3.1 — the licensed user count is not capped.",
  "summar": "**Contract Summary — Acme Healthcare Solutions**\nThis is a 24-month Enterprise SaaS Agreement valued at **$280,000 USD**, effective Jan 1, 2026 through Dec 31, 2027.\n- Payment: Quarterly, Net 30\n- Auto-renewal: Yes, 60-day cancellation notice required\n- SLA: 99.5% uptime, P1 4-hour response time\n- Early termination fee: 20% of remaining contract value",
};

function aiAnswer(q: string) {
  const l = q.toLowerCase();
  for (const [k, v] of Object.entries(QA)) {
    if (l.includes(k)) return v;
  }
  return `I could not find a specific clause for **"${q}"** in this contract. This may be a gap worth flagging. Recommend reviewing Section 3 (Scope) and Section 12 (Term & Termination) or consulting your legal team.`;
}

function Txt({ s }: { s: string }) {
  return (
    <>
      {s.split("\n").map((line, li) => (
        <span key={li}>
          {li > 0 && <br />}
          {line.split(/(\*\*[^*]+\*\*)/).map((p, i) =>
            p.startsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>
          )}
        </span>
      ))}
    </>
  );
}

const QUICK = [
  "Summarize this contract",
  "What is the contract value?",
  "When does it expire?",
  "Is there an auto-renewal clause?",
  "What are the payment terms?",
  "Identify contract gaps",
  "What are the SLA commitments?",
  "Termination conditions?",
];

export default function ContractAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [drag, setDrag] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [inp, setInp] = useState("");
  const [busy, setBusy] = useState(false);
  const fRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const pick = (f: File) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFile(f);
      setMsgs([{ role: "ai", text: `Contract ready: **${f.name}**\n\nI've analyzed the document. Ask me about terms, risks, payment, renewals, SLA, or gaps.` }]);
    }, 1500);
  };

  const send = (t: string) => {
    if (!t.trim() || busy) return;
    const next: Msg[] = [...msgs, { role: "user", text: t }];
    setMsgs(next); setInp(""); setBusy(true);
    setTimeout(() => {
      setMsgs([...next, { role: "ai", text: aiAnswer(t) }]);
      setBusy(false);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 60);
    }, 900 + Math.random() * 600);
  };

  if (!file && !loading) {
    return (
      <div style={{ width: "100%", height: "100%", minHeight: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#fff", padding: 40, boxSizing: "border-box", overflowY: "auto" }}>
        <div style={{ width: 68, height: 68, background: "#EFF6FF", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
          <Icon icon="lucide:file-search" width={34} height={34} style={{ color: "#0176D3" }} />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: "0 0 8px" }}>Contract Analyzer</h2>
        <p style={{ fontSize: 14, color: "#6B7280", maxWidth: 420, textAlign: "center", margin: "0 0 28px" }}>
          Upload a contract document and ask our AI anything — clause lookups, risk gaps, payment terms, renewal conditions, and more.
        </p>

        <div
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) pick(f); }}
          onClick={() => fRef.current?.click()}
          style={{ width: "100%", maxWidth: 460, height: 200, border: `2px dashed ${drag ? "#0176D3" : "#D1D5DB"}`, borderRadius: 16, background: drag ? "#EFF6FF" : "#F9FAFB", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, cursor: "pointer", flexShrink: 0 }}
        >
          <div style={{ width: 52, height: 52, background: drag ? "#DBEAFE" : "#E5E7EB", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon icon="lucide:upload-cloud" width={26} height={26} style={{ color: drag ? "#0176D3" : "#9CA3AF" }} />
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#374151", margin: "0 0 4px" }}>{drag ? "Release to upload" : "Drag & drop your contract here"}</p>
            <p style={{ fontSize: 13, color: "#9CA3AF", margin: 0 }}>PDF, DOCX, or TXT · Up to 50 MB</p>
          </div>
          <button onClick={e => { e.stopPropagation(); fRef.current?.click(); }} style={{ background: "#0176D3", color: "#fff", border: "none", borderRadius: 10, padding: "9px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            Browse Files
          </button>
          <input ref={fRef} type="file" accept=".pdf,.docx,.txt,.doc" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) pick(f); }} />
        </div>

        <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, maxWidth: 460 }}>
          {["Clause lookup", "Risk & gap analysis", "Payment terms", "SLA review", "Auto-renewal check", "Termination conditions"].map(c => (
            <span key={c} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 20, background: "#F3F4F6", color: "#374151", display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Icon icon="lucide:check" width={11} height={11} style={{ color: "#22C55E" }} />{c}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ width: "100%", height: "100%", minHeight: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#fff", gap: 16 }}>
        <div style={{ width: 60, height: 60, background: "#EFF6FF", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon icon="lucide:loader-circle" width={30} height={30} style={{ color: "#0176D3" }} className="animate-spin" />
        </div>
        <p style={{ fontSize: 15, fontWeight: 600, color: "#374151" }}>Analyzing contract…</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {["Reading clauses", "Extracting terms", "Scanning for gaps", "Building index"].map((s, i) => (
            <span key={i} className="animate-pulse" style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "#EFF6FF", color: "#0176D3", fontWeight: 500 }}>{s}</span>
          ))}
        </div>
      </div>
    );
  }

  // Chat view
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#fff", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: 252, flexShrink: 0, borderRight: "1px solid #F3F4F6", overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 11, padding: 11 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div style={{ width: 30, height: 30, background: "#DCFCE7", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon icon="lucide:file-check-2" width={15} height={15} style={{ color: "#16A34A" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#111827", margin: "0 0 1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file?.name}</p>
              <p style={{ fontSize: 11, color: "#16A34A", margin: 0 }}>Analyzed · Ready</p>
            </div>
            <button onClick={() => { setFile(null); setMsgs([]); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#16A34A", padding: 2, lineHeight: 1 }}>
              <Icon icon="lucide:x" width={13} height={13} />
            </button>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 11, padding: 11 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 7px" }}>Document Info</p>
          {[["Customer", "Acme Healthcare"], ["Type", "Enterprise SaaS"], ["Value", "$280,000 USD"], ["Start", "Jan 1, 2026"], ["Expires", "Dec 31, 2027"], ["Payment", "Net 30, Quarterly"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: "#9CA3AF" }}>{k}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 11, padding: 11 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 7px" }}>Contract Health</p>
          {[["Completeness", 78, "#F59E0B"], ["Compliance", 92, "#22C55E"], ["Risk Score", 34, "#22C55E"]].map(([l, s, c]) => (
            <div key={String(l)} style={{ marginBottom: 7 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontSize: 11, color: "#6B7280" }}>{l}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: String(c) }}>{s}%</span>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: "#F3F4F6" }}>
                <div style={{ height: "100%", borderRadius: 3, width: `${s}%`, background: String(c) }} />
              </div>
            </div>
          ))}
        </div>

        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 5px 2px" }}>Quick Questions</p>
          {QUICK.map(q => (
            <button key={q} onClick={() => send(q)} style={{ display: "block", width: "100%", textAlign: "left", fontSize: 12, padding: "7px 10px", borderRadius: 7, border: "1px solid #E5E7EB", background: "#F9FAFB", color: "#374151", cursor: "pointer", marginBottom: 3, fontFamily: "inherit", lineHeight: 1.4 }}>
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderBottom: "1px solid #F3F4F6", flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, background: "#EFF6FF", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon icon="lucide:brain-circuit" width={16} height={16} style={{ color: "#0176D3" }} />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: 0 }}>Contract AI</p>
            <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>Ask anything about this contract</p>
          </div>
          <span style={{ marginLeft: "auto", fontSize: 11, padding: "2px 10px", borderRadius: 20, background: "#DCFCE7", color: "#16A34A", fontWeight: 600 }}>● Active</span>
        </div>

        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "14px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 9, justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              {m.role === "ai" && (
                <div style={{ width: 27, height: 27, background: "#EFF6FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon icon="lucide:brain-circuit" width={13} height={13} style={{ color: "#0176D3" }} />
                </div>
              )}
              <div style={{ maxWidth: "70%", padding: "10px 14px", fontSize: 14, lineHeight: 1.6, background: m.role === "user" ? "#0176D3" : "#F9FAFB", color: m.role === "user" ? "#fff" : "#374151", border: m.role === "ai" ? "1px solid #E5E7EB" : "none", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px" }}>
                <Txt s={m.text} />
              </div>
              {m.role === "user" && (
                <div style={{ width: 27, height: 27, background: "#0176D3", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 10, fontWeight: 700, color: "#fff" }}>JD</div>
              )}
            </div>
          ))}
          {busy && (
            <div style={{ display: "flex", gap: 9 }}>
              <div style={{ width: 27, height: 27, background: "#EFF6FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon icon="lucide:brain-circuit" width={13} height={13} style={{ color: "#0176D3" }} />
              </div>
              <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "18px 18px 18px 4px", padding: "12px 15px", display: "flex", gap: 5, alignItems: "center" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, background: "#D1D5DB", borderRadius: "50%", animation: `caDot 1.2s ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div style={{ padding: "11px 18px 14px", borderTop: "1px solid #F3F4F6", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 9, background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 11, padding: "9px 12px" }}>
            <textarea
              value={inp}
              onChange={e => setInp(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(inp); } }}
              placeholder="Ask a question about this contract…"
              disabled={busy}
              rows={1}
              style={{ flex: 1, resize: "none", background: "transparent", border: "none", outline: "none", fontSize: 14, color: "#111827", lineHeight: 1.6, maxHeight: 90, minHeight: 22, fontFamily: "inherit" }}
            />
            <button
              onClick={() => send(inp)}
              disabled={!inp.trim() || busy}
              style={{ width: 34, height: 34, flexShrink: 0, background: inp.trim() && !busy ? "#0176D3" : "#E5E7EB", color: inp.trim() && !busy ? "#fff" : "#9CA3AF", border: "none", borderRadius: 9, cursor: inp.trim() && !busy ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Icon icon="lucide:send" width={14} height={14} />
            </button>
          </div>
          <p style={{ fontSize: 11, color: "#D1D5DB", textAlign: "center", margin: "6px 0 0" }}>Press Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
      <style>{`@keyframes caDot{0%,80%,100%{opacity:.4;transform:translateY(0)}40%{opacity:1;transform:translateY(-4px)}}`}</style>
    </div>
  );
}