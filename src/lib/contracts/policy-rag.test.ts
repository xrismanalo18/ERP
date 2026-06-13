import { describe, expect, it } from "vitest";

import { findHardPolicyEvidence, retrievePolicies } from "./policy-rag";

const policy = `POLICY ID: DATA-AI-001
TITLE: Prohibition on Vendor AI Training and Commercialization of Customer Data
SEVERITY: HARD REJECT

Reject contracts that allow a vendor to use Customer Data, prompts, outputs, or
derived data to train or commercialize vendor products.`;

describe("contract policy retrieval", () => {
  it("retrieves the AI data-use policy for relevant contract language", () => {
    const results = retrievePolicies(
      policy,
      "Vendor may use Customer Data, prompts, outputs, and derived data to train and commercialize Vendor products.",
    );
    expect(results[0]?.id).toBe("DATA-AI-001");
    expect(results[0]?.score).toBeGreaterThan(0);
  });

  it("hard-rejects the vendor-heavy sample language", () => {
    const evidence = findHardPolicyEvidence(
      "Vendor may use Customer Data, prompts, outputs, and derived data to operate, improve, train, and commercialize Vendor products.",
    );
    expect(evidence).toContain("commercialize Vendor products");
  });

  it("does not reject customer-restricted processing", () => {
    const evidence = findHardPolicyEvidence(
      "Provider may process Customer Data only to provide, secure, support, and maintain the contracted service.",
    );
    expect(evidence).toBeNull();
  });
});
