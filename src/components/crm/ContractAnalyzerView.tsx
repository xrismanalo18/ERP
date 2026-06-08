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

/* ─── UPLOAD SCREEN ────────────────────────────────────────────── */
function UploadScreen({ onFile }: { onFile: (f: File) => void }) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const pick = (f: File) => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onFile(f); }, 1600);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-6" style={{ minHeight: 0 }}>
      {/* Heading */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mx-auto mb-4 rounded-2xl" style={{ width: 72, height: 72, background: "#EFF6FF" }}>
          <Icon icon="lucide:file-search" width={36} height={36} style={{ color: "#0176D3" }} />
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#111827" }}>Contract Analyzer</h2>
        <p className="text-sm max-w-md" style={{ color: "#6B7280" }}>
          Upload a contract document and ask our AI any question — clause lookups, risk gaps, payment terms, renewal conditions, and more.
        </p>
      </div>

      {/* Drop zone */}
      {loading ? (
        <div className="flex flex-col items-center gap-4" style={{ width: 520 }}>
          <div className="rounded-2xl flex items-center justify-center" style={{ width: 64, height: 64, background: "#EFF6FF" }}>
            <Icon icon="lucide:loader-circle" width={30} height={30} style={{ color: "#0176D3" }} className="animate-spin" />
          </div>
          <p className="font-semibold text-sm" style={{ color: "#374151" }}>Analyzing contract…</p>
          <div className="flex gap-2 flex-wrap justify-center">
            {["Reading clauses", "Extracting terms", "Scanning for gaps", "Building index"].map((s, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full font-medium animate-pulse"
                style={{ background: "#EFF6FF", color: "#0176D3", animationDelay: `${i * 0.25}s` }}>{s}</span>
            ))}
          </div>
        </div>
      ) : (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) pick(f); }}
          onClick={() => fileRef.current?.click()}
          className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all"
          style={{
            width: 520,
            height: 240,
            borderColor: dragging ? "#0176D3" : "#D1D5DB",
            background: dragging ? "#EFF6FF" : "#F9FAFB",
          }}
        >
          <div className="rounded-2xl flex items-center justify-center transition-colors" style={{ width: 60, height: 60, background: dragging ? "#DBEAFE" : "#E5E7EB" }}>
            <Icon icon="lucide:upload-cloud" width={28} height={28} style={{ color: dragging ? "#0176D3" : "#9CA3AF" }} />
          </div>
          <div className="text-center">
            <p className="font-semibold text-base" style={{ color: "#374151" }}>
              {dragging ? "Release to upload" : "Drag & drop your contract here"}
            </p>
            <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>PDF, DOCX, or TXT · Up to 50 MB</p>
          </div>
          <button
            className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-colors"
            style={{ background: "#0176D3" }}
            onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}
          >
            Browse Files
          </button>
          <input ref={fileRef} type="file" accept=".pdf,.docx,.txt,.doc" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) pick(f); }} />
        </div>
      )}

      {/* Capability pills */}
      {!loading && (
        <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-lg">
          {["Clause lookup", "Risk & gap analysis", "Payment terms", "SLA review", "Auto-renewal check", "Data privacy", "Termination conditions"].map(c => (
            <span key={c} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
              style={{ background: "#F3F4F6", color: "#374151" }}>
              <Icon icon="lucide:check" width={11} height={11} style={{ color: "#22C55E" }} />
              {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── CHAT SCREEN ──────────────────────────────────────────────── */
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
    <div className="flex h-full" style={{ minHeight: 0 }}>
      {/* Left sidebar */}
      <div className="shrink-0 flex flex-col gap-3 p-4 border-r overflow-y-auto" style={{ width: 260, borderColor: "#F3F4F6" }}>
        {/* File info */}
        <div className="rounded-xl p-3" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
          <div className="flex items-start gap-2">
            <div className="rounded-lg flex items-center justify-center shrink-0" style={{ width: 32, height: 32, background: "#DCFCE7" }}>
              <Icon icon="lucide:file-check-2" width={16} height={16} style={{ color: "#16A34A" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: "#111827" }}>{file.name}</p>
              <p className="text-xs" style={{ color: "#16A34A" }}>Analyzed · Ready</p>
            </div>
            <button onClick={onClear} className="p-1 rounded hover:bg-green-200 transition-colors shrink-0" style={{ color: "#16A34A" }}>
              <Icon icon="lucide:x" width={12} height={12} />
            </button>
          </div>
        </div>

        {/* Contract info */}
        <div className="rounded-xl p-3" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "#6B7280" }}>Document Info</p>
          <div className="space-y-1.5">
            {[
              ["Customer", "Acme Healthcare"],
              ["Type", "Enterprise SaaS"],
              ["Value", "$280,000 USD"],
              ["Start", "Jan 1, 2026"],
              ["Expires", "Dec 31, 2027"],
              ["Auto-Renewal", "Yes · 60d notice"],
              ["Payment", "Net 30, Quarterly"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-1">
                <span className="text-xs shrink-0" style={{ color: "#9CA3AF" }}>{k}</span>
                <span className="text-xs font-semibold text-right" style={{ color: "#374151" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Health scores */}
        <div className="rounded-xl p-3" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "#6B7280" }}>Contract Health</p>
          {[
            { label: "Completeness", score: 78, color: "#F59E0B" },
            { label: "Compliance", score: 92, color: "#22C55E" },
            { label: "Risk Score", score: 34, color: "#22C55E" },
          ].map(({ label, score, color }) => (
            <div key={label} className="mb-2">
              <div className="flex justify-between mb-0.5">
                <span className="text-xs" style={{ color: "#6B7280" }}>{label}</span>
                <span className="text-xs font-bold" style={{ color }}>{score}%</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: "#F3F4F6" }}>
                <div className="h-full rounded-full" style={{ width: `${score}%`, background: color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Suggested questions */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wide mb-2 px-1" style={{ color: "#6B7280" }}>Quick Questions</p>
          <div className="flex flex-col gap-1">
            {SUGGESTED.map(q => (
              <button key={q} onClick={() => send(q)}
                className="text-left text-xs px-3 py-2 rounded-lg border transition-colors hover:border-blue-300 hover:bg-blue-50"
                style={{ background: "#F9FAFB", borderColor: "#E5E7EB", color: "#374151" }}>
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col" style={{ minWidth: 0 }}>
        {/* Chat header */}
        <div className="flex items-center gap-3 px-5 py-3 border-b shrink-0" style={{ borderColor: "#F3F4F6" }}>
          <div className="rounded-lg flex items-center justify-center shrink-0" style={{ width: 32, height: 32, background: "#EFF6FF" }}>
            <Icon icon="lucide:brain-circuit" width={16} height={16} style={{ color: "#0176D3" }} />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#111827" }}>Contract AI</p>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>Ask anything about this contract</p>
          </div>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#DCFCE7", color: "#16A34A" }}>
            ● Active
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "ai" && (
                <div className="rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ width: 28, height: 28, background: "#EFF6FF" }}>
                  <Icon icon="lucide:brain-circuit" width={13} height={13} style={{ color: "#0176D3" }} />
                </div>
              )}
              <div className="rounded-2xl px-4 py-3 text-sm leading-relaxed"
                style={{
                  maxWidth: "72%",
                  background: m.role === "user" ? "#0176D3" : "#F9FAFB",
                  color: m.role === "user" ? "#fff" : "#374151",
                  border: m.role === "ai" ? "1px solid #E5E7EB" : "none",
                  borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                }}>
                <MarkdownText text={m.text} />
              </div>
              {m.role === "user" && (
                <div className="rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-white" style={{ width: 28, height: 28, background: "#0176D3" }}>JD</div>
              )}
            </div>
          ))}

          {thinking && (
            <div className="flex gap-3 justify-start">
              <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: 28, height: 28, background: "#EFF6FF" }}>
                <Icon icon="lucide:brain-circuit" width={13} height={13} style={{ color: "#0176D3" }} />
              </div>
              <div className="rounded-2xl px-4 py-3 flex gap-1.5 items-center" style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "18px 18px 18px 4px" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} className="rounded-full" style={{ width: 7, height: 7, background: "#D1D5DB", animation: `aiDotBounce 1.2s ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-5 py-4 border-t shrink-0" style={{ borderColor: "#F3F4F6" }}>
          <div className="flex items-end gap-3 rounded-xl border px-4 py-3 focus-within:border-blue-400 transition-colors"
            style={{ borderColor: "#E5E7EB", background: "#F9FAFB" }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder="Ask a question about this contract…"
              disabled={thinking}
              rows={1}
              className="flex-1 resize-none text-sm outline-none bg-transparent"
              style={{ color: "#111827", maxHeight: 100, minHeight: 22, lineHeight: 1.6 }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || thinking}
              className="flex items-center justify-center rounded-xl shrink-0 transition-colors"
              style={{
                width: 36, height: 36,
                background: input.trim() && !thinking ? "#0176D3" : "#E5E7EB",
                color: input.trim() && !thinking ? "#fff" : "#9CA3AF",
              }}
            >
              <Icon icon="lucide:send" width={15} height={15} />
            </button>
          </div>
          <p className="text-xs mt-2 text-center" style={{ color: "#D1D5DB" }}>
            AI responses are based on the uploaded contract. Press Enter to send, Shift+Enter for new line.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── ROOT COMPONENT ────────────────────────────────────────────── */
export default function ContractAnalyzerView() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="flex h-full" style={{ overflow: "hidden" }}>
      {!file ? (
        <UploadScreen onFile={setFile} />
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#fff" }}>
          <ChatScreen file={file} onClear={() => setFile(null)} />
        </div>
      )}
      <style>{`
        @keyframes aiDotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}