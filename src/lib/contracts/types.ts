export type RiskLevel = "low" | "medium" | "high";

export type ContractCitation = {
  page: number | null;
  section: string | null;
  quote: string;
};

export type ContractFinding = {
  title: string;
  summary: string;
  risk: RiskLevel;
  recommendation: string;
  citations: ContractCitation[];
};

export type ContractDeadline = {
  label: string;
  dateOrPeriod: string;
  action: string;
  risk: RiskLevel;
  citations: ContractCitation[];
};

export type ContractMetadata = {
  title: string | null;
  parties: string[];
  effectiveDate: string | null;
  expirationDate: string | null;
  contractValue: string | null;
  paymentTerms: string | null;
};

export type PolicyDecision = {
  status: "pass" | "review" | "reject";
  policyId: string | null;
  policyTitle: string | null;
  rationale: string;
  matchedContractText: string | null;
  policyText: string | null;
};

export type ContractAnalysis = {
  mode: "initial_analysis" | "question";
  isSaasAgreement: boolean;
  contractType: string;
  simpleAnswer: string;
  technicalAnalysis: string;
  overallRisk: RiskLevel;
  metadata: ContractMetadata;
  findings: ContractFinding[];
  gaps: ContractFinding[];
  deadlines: ContractDeadline[];
  citations: ContractCitation[];
  notFound: boolean;
  warning: string | null;
  policyDecision: PolicyDecision;
};

export type ExtractedContract = {
  filename: string;
  mimeType: string;
  pageCount: number | null;
  characterCount: number;
  text: string;
  warnings: string[];
};
