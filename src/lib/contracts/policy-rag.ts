export type RetrievedPolicy = {
  id: string;
  title: string;
  severity: string;
  text: string;
  score: number;
};

const STOP_WORDS = new Set([
  "and",
  "any",
  "for",
  "from",
  "must",
  "only",
  "the",
  "this",
  "that",
  "with",
]);

function terms(value: string) {
  return new Set(
    value
      .toLowerCase()
      .match(/[a-z][a-z-]{2,}/g)
      ?.filter(term => !STOP_WORDS.has(term)) || [],
  );
}

function field(chunk: string, label: string) {
  return chunk.match(new RegExp(`^${label}:\\s*(.+)$`, "mi"))?.[1]?.trim() || "";
}

export function retrievePolicies(policyDocument: string, query: string, limit = 3): RetrievedPolicy[] {
  const queryTerms = terms(query);
  return policyDocument
    .split(/\n(?=POLICY ID:)/)
    .map(chunk => {
      const chunkTerms = terms(chunk);
      let score = 0;
      for (const term of queryTerms) if (chunkTerms.has(term)) score += 1;
      return {
        id: field(chunk, "POLICY ID"),
        title: field(chunk, "TITLE"),
        severity: field(chunk, "SEVERITY"),
        text: chunk.trim(),
        score,
      };
    })
    .filter(policy => policy.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function findHardPolicyEvidence(contractText: string) {
  const normalized = contractText.replace(/\s+/g, " ");
  const patterns = [
    /vendor may use customer data, prompts, outputs, and derived data to operate, improve, train, and commercialize vendor products\./i,
    /use customer data.{0,180}(train|training).{0,180}(commercialize|commercialization)/i,
    /use.{0,120}(prompts|outputs|derived data).{0,180}(train|commercialize)/i,
  ];

  for (const pattern of patterns) {
    const match = normalized.match(pattern);
    if (match) return match[0];
  }
  return null;
}
