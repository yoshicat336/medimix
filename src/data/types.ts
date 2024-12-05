export type SeverityLevel = "low" | "moderate" | "high" | "severe";
export type CombinationKey = `${string}-${string}`;

export interface CombinationExplanation {
  plainLanguage: string;
  severity: SeverityLevel;
  reasoning: string;
  pronunciation: string;
}