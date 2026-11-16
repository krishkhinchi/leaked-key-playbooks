export type EvidenceLevel = "official" | "reproduced" | "incident" | "community";
export type SeverityLevel = "critical" | "high" | "medium" | "low";
export type VerificationStatus = "verified" | "unverified" | "stale" | "planned";

export interface Source {
  title: string;
  url: string;
  type: "official-docs" | "security-advisory" | "incident-report" | "reproduction";
}

export interface ImmediateAction {
  order: number;
  title: string;
  description: string;
  command?: string;
}

export interface Playbook {
  id: string;
  provider: string;
  providerSlug: string;
  providerCategory: string;
  credentialName: string;
  credentialSlug: string;
  description: string;
  severity: SeverityLevel;
  permissions: string[];
  exposureImpact: string[];
  immediateActions: ImmediateAction[];
  revocation: string;
  rotation: string;
  gracePeriod: string;
  sessionPersistence: string;
  investigation: string[];
  recovery: string[];
  prevention: string[];
  sources: Source[];
  evidenceLevel: EvidenceLevel;
  verificationStatus: VerificationStatus;
  lastVerified: string;
  expiresAt: string;
}

export interface Provider {
  slug: string;
  name: string;
  category: string;
  description: string;
  docsUrl: string;
  securityUrl: string;
  credentialCount: number;
  status: VerificationStatus;
}

export const PROVIDER_CATEGORIES = [
  "Cloud Infrastructure",
  "AI & Developer APIs",
  "Source Control",
  "Payment & Financial",
  "Communication",
  "Database & Storage",
  "Deployment & Hosting",
  "Identity & Auth",
] as const;

export type ProviderCategory = (typeof PROVIDER_CATEGORIES)[number];
