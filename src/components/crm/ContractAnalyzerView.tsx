"use client";
import { Icon } from "@iconify/react";
import { useState, useRef } from "react";

type Message = { role: "user" | "ai"; text: string };

const SAMPLE_QA: Record<string, string> = {
  "what is the contract value": "The total contract value is **$280,000 USD** for a 24-month term, with a scheduled annual increase of 5% beginning in Year 2 (effective January 1, 2027).",
  "when does the contract expire": "The contract has an effective date of **January 1, 2026** and expires on **December 31, 2027** unless renewed or terminated pursuant to Section 12.1.",
  "what are the payment terms": "Per Section 5.2, payment is due **Net 30** from invoice date. Late payments accrue interest at 1.5% per month. Invoices are issued quarterly in advance.",
  "is there an auto renewal clause": "Yes. Section 12.3 includes an **automatic renewal clause** — the contract auto-renews for successive 12-month terms unless either party provides written notice of non-renewal at least **60 days prior** to the expiration date.",
  "what are the termination conditions": "Section 12.1 allows termination for cause with **30 days written notice** if a material breach is not cured. Section 12.2 allows termination for convenience with **90 days written notice**, subject to an early termination fee of 20% of remaining contract value.",
  "are there any sla commitments": "Section 8 outlines SLA commitments: **99.5% uptime** guarantee per calendar month, **4-hour response time** for P1 incidents, and **8-hour resolution target** for P2 incidents. Credits are issued for SLA breaches at 5% of monthly fees per incident.",
  "what are the data privacy obligations": "Section 10 references compliance with **GDPR**, **CCPA**, and **Data Privacy Act of 2012 (Philippines)**. The vendor agrees to maintain a Data Processing Agreement (DPA) and notify the customer within **72 hours** of any confirmed data breach.",
  "identify contract gaps": "I identified **3 potential contract gaps**:\n1. **Budget owner** is not named — the signatory is listed as the VP of IT, but no procurement or finance approver is identified.\n2. **Renewal blocker clause** is missing — there is no provision addressing what happens if the customer is in dispute at renewal time.\n3. **Scope of use limitation** is vague in Section 3.1 — the number of licensed users is not capped, which could create billing ambiguity.",
  "summarize": "**Contract Summary — Acme Healthcare Solutions**\n\nThis is a 24-month Enterprise SaaS Agreement valued at **$280,000 USD**, effective January 1, 2026 through December 31, 2027. Key highlights:\n- Payment is quarterly, Net 30\n- Auto-renewal applies with 60 days written notice required to cancel\n- 99.5% uptime SLA with P1 4-hour response time\n- Governed by Philippine law and GDPR/CCPA compliant\n- Early termination fee of 20% of remaining contract value applies",
};

function simulateAIResponse(question: string): string {
  const q = question.toLowerCase().trim();
  for (const [key, answer] of Object.entries(SAMPLE_QA)) {
    if (key.split(" ").filter(w => w.length > 3).some(w => q.includes(w))) {
      return answer;
    }
  }
  return `Based on the uploaded contract, I could not find a specific clause directly answering **"${question}"**. This may indicate the contract is silent on this point — which itself could be a gap worth flagging. I recommend reviewing Section 3 (Scope) and Section 12 (Term & Termination) manually, or escalating to your legal or RevOps team.`;
}

const SUGGESTED = [
  "Summarize this contract",
  "What is the contract value?",
  "When does the contract expire?",
  "Is there an auto-renewal clause?",
  "What are the payment terms?",
  "Identify contract gaps",
  "What are the SLA commitments?",
  "What are the termination conditions?",
];

function MarkdownText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, li) => {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <span key={li}>
            {li > 0 && <br />}
            {parts.map((p, i) =>
              p.startsWith("**") && p.endsWith("**")
                ? <strong key={i}>{p.slice(2, -2)}</strong>
                : <span key={i}>{p}</span>
            )}
          </span>
        );
      })}
    </>
  );
}

function UploadScreen({ onFile }: { onFile: (f: File) => void }) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const pick = (f: File) => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onFile(f); }, 1600);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, padding: "24px" }}>
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{ width: 72, height: 72, background: "#EFF6FF", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <Icon icon="lucide:file-search" width={36} height={36} style={{ color: "#0176D3" }} />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: "0 0 8px" }}>Contract Analyzer</h2>
        <p style={{ fontSize: 14, color: "#6B7280", maxWidth: 440, margin: "0 auto" }}>
          Upload a contract document and ask our AI any question — clause lookups, risk gaps, payment terms, renewal conditions, and more.
        </p>
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, background: "#EFF6FF", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon icon="lucide:loader-circle" width={30} height={30} style={{ color: "#0176D3" }} className="animate-spin" />
          </div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>Analyzing contract…</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {["Reading clauses", "Extracting terms", "Scanning for gaps", "Building index"].map((s, i) => (
              <span key={i} className="animate-pulse" style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "#EFF6FF", color: "#0176D3", fontWeight: 500, animationDelay: `${i * 0.25}s` }}>{s}</span>
            ))}
          </div>
        </div>
      ) : (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) pick(f); }}
          onClick={() => fileRef.current?.click()}
          style={{
            width: 520, height: 240,
            border: `2px dashed ${dragging ? "#0176D3" : "#D1D5DB"}`,
            borderRadius: 16,
            background: dragging ? "#EFF6FF" : "#F9FAFB",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16,
            cursor: "pointer", transition: "all 150ms",
          }}
        >
          <div style={{ width: 60, height: 60, background: dragging ? "#DBEAFE" : "#E5E7EB", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon icon="lucide:upload-cloud" width={28} height={28} style={{ color: dragging ? "#0176D3" : "#9CA3AF" }} />
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontWeight: 600, fontSize: 15, color: "#374151", margin: "0 0 4px" }}>
              {dragging ? "Release to upload" : "Drag & drop your contract here"}
            </p>
            <p style={{ fontSize: 13, color: "#9CA3AF", margin: 0 }}>PDF, DOCX, or TXT · Up to 50 MB</p>
          </div>
          <button
            style={{ background: "#0176D3", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
            onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}
          >
            Browse Files
          </button>
          <input ref={fileRef} type="file" accept=".pdf,.docx,.txt,.doc" style={{ display: "none" }}
            onChange={e => { const f = e.target.files?.[0]; if (f) pick(f); }} />
        </div>
      )}

      {!loading && (
        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, maxWidth: 520 }}>
          {["Clause lookup", "Risk & gap analysis", "Payment terms", "SLA review", "Auto-renewal check", "Data privacy", "Termination conditions"].map(c => (
            <span key={c} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, padding: "6px 12px", borderRadius: 20, background: "#F3F4F6", color: "#374151", fontWeight: 500 }}>
              <Icon icon="lucide:check" width={11} height={11} style={{ color: "#22C55E" }} />
              {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ChatScreen({ file, onClear }: { file: File; onClear: () => void }) {
  const [messages, setMessages] = useState<Message[]>([{
    role: "ai",
    text: `Contract ready: **${file.name}**\n\nI've analyzed the document. You can now ask me about contract terms, payment schedules, SLA commitments, renewal clauses, termination conditions, or ask me to identify any gaps.`,
  }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = (text: string) => {
    if (!text.trim() || thinking) return;
    setMessages(p => [...p, { role: "user", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages(p => [...p, { role: "ai", text: simulateAIResponse(text) }]);
      setThinking(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }, 800 + Math.random() * 700);
  };

  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
      {/* Left sidebar */}
      <div style={{ width: 260, flexShrink: 0, display: "flex", flexDirection: "column", gap: 12, padding: 16, borderRight: "1px solid #F3F4F6", overflowY: "auto" }}>
        {/* File info */}
        <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: 12 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div style={{ width: 32, height: 32, background: "#DCFCE7", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon icon="lucide:file-check-2" width={16} height={16} style={{ color: "#16A34A" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#111827", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</p>
              <p style={{ fontSize: 11, color: "#16A34A", margin: 0 }}>Analyzed · Ready</p>
            </div>
            <button onClick={onClear} style={{ background: "none", border: "none", cursor: "pointer", color: "#16A34A", padding: 2, flexShrink: 0 }}>
              <Icon icon="lucide:x" width={13} height={13} />
            </button>
          </div>
        </div>

        {/* Contract info */}
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px" }}>Document Info</p>
          {[
            ["Customer", "Acme Healthcare"],
            ["Type", "Enterprise SaaS"],
            ["Value", "$280,000 USD"],
            ["Start", "Jan 1, 2026"],
            ["Expires", "Dec 31, 2027"],
            ["Auto-Renewal", "Yes · 60d notice"],
            ["Payment", "Net 30, Quarterly"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: "#9CA3AF" }}>{k}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#374151", textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Health */}
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px" }}>Contract Health</p>
          {[
            { label: "Completeness", score: 78, color: "#F59E0B" },
            { label: "Compliance", score: 92, color: "#22C55E" },
            { label: "Risk Score", score: 34, color: "#22C55E" },
          ].map(({ label, score, color }) => (
            <div key={label} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontSize: 11, color: "#6B7280" }}>{label}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color }}>{score}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "#F3F4F6" }}>
                <div style={{ height: "100%", borderRadius: 3, width: `${score}%`, background: color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Suggested questions */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px 4px" }}>Quick Questions</p>
          {SUGGESTED.map(q => (
            <button key={q} onClick={() => send(q)}
              style={{ display: "block", width: "100%", textAlign: "left", fontSize: 12, padding: "8px 12px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#F9FAFB", color: "#374151", cursor: "pointer", marginBottom: 4 }}>
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: "1px solid #F3F4F6", flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, background: "#EFF6FF", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon icon="lucide:brain-circuit" width={16} height={16} style={{ color: "#0176D3" }} />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: 0 }}>Contract AI</p>
            <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>Ask anything about this contract</p>
          </div>
          <span style={{ marginLeft: "auto", fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#DCFCE7", color: "#16A34A", fontWeight: 600 }}>● Active</span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 10, justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              {m.role === "ai" && (
                <div style={{ width: 28, height: 28, background: "#EFF6FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <Icon icon="lucide:brain-circuit" width={13} height={13} style={{ color: "#0176D3" }} />
                </div>
              )}
              <div style={{
                maxWidth: "72%",
                background: m.role === "user" ? "#0176D3" : "#F9FAFB",
                color: m.role === "user" ? "#fff" : "#374151",
                border: m.role === "ai" ? "1px solid #E5E7EB" : "none",
                borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                padding: "12px 16px",
                fontSize: 14,
                lineHeight: 1.6,
              }}>
                <MarkdownText text={m.text} />
              </div>
              {m.role === "user" && (
                <div style={{ width: 28, height: 28, background: "#0176D3", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, fontSize: 11, fontWeight: 700, color: "#fff" }}>JD</div>
              )}
            </div>
          ))}

          {thinking && (
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ width: 28, height: 28, background: "#EFF6FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon icon="lucide:brain-circuit" width={13} height={13} style={{ color: "#0176D3" }} />
              </div>
              <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "18px 18px 18px 4px", padding: "12px 16px", display: "flex", gap: 6, alignItems: "center" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 7, height: 7, background: "#D1D5DB", borderRadius: "50%", animation: `aiDot 1.2s ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: "12px 20px 16px", borderTop: "1px solid #F3F4F6", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 12, padding: "10px 14px" }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder="Ask a question about this contract…"
              disabled={thinking}
              rows={1}
              style={{ flex: 1, resize: "none", background: "transparent", border: "none", outline: "none", fontSize: 14, color: "#111827", lineHeight: 1.6, maxHeight: 100, minHeight: 22 }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || thinking}
              style={{
                width: 36, height: 36, flexShrink: 0,
                background: input.trim() && !thinking ? "#0176D3" : "#E5E7EB",
                color: input.trim() && !thinking ? "#fff" : "#9CA3AF",
                border: "none", borderRadius: 10, cursor: input.trim() && !thinking ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Icon icon="lucide:send" width={15} height={15} />
            </button>
          </div>
          <p style={{ fontSize: 11, color: "#D1D5DB", textAlign: "center", margin: "8px 0 0" }}>
            AI responses are based on the uploaded contract. Press Enter to send.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes aiDot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function ContractAnalyzerView() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden", background: "#fff" }}>
      {!file ? (
        <UploadScreen onFile={setFile} />
      ) : (
        <ChatScreen file={file} onClear={() => setFile(null)} />
      )}
    </div>
  );
}