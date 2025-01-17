export type SeverityLevel = "low" | "moderate" | "high" | "severe";
export type CombinationKey = `${string}-${string}`;

export interface CombinationExplanation {
  plainLanguage: string;
  severity: SeverityLevel;
  reasoning: string;
  pronunciation: string;
}

export interface Contribution {
  prefix: string;
  suffix: string;
  plainLanguage: string;
  severity: SeverityLevel;
  reasoning: string;
  pronunciation: string;
  timestamp: Date;
}

export interface Report {
  term: string;
  reason: string;
  timestamp: Date;
}