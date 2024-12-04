export const prefixes = [
  { value: "osteo", label: "Osteo-", meaning: "bone" },
  { value: "cardio", label: "Cardio-", meaning: "heart" },
  { value: "dermato", label: "Dermato-", meaning: "skin" },
  { value: "gastro", label: "Gastro-", meaning: "stomach" },
  { value: "neuro", label: "Neuro-", meaning: "nerve/nervous system" },
];

export const suffixes = [
  { value: "itis", label: "-itis", meaning: "inflammation" },
  { value: "ectomy", label: "-ectomy", meaning: "surgical removal" },
  { value: "ology", label: "-ology", meaning: "study of" },
  { value: "algia", label: "-algia", meaning: "pain" },
  { value: "oma", label: "-oma", meaning: "tumor" },
];

type CombinationKey = `${string}-${string}`;

export const combinationExplanations: Record<CombinationKey, {
  plainLanguage: string;
  severity: "low" | "moderate" | "high" | "severe";
  reasoning: string;
}> = {
  "osteo-itis": {
    plainLanguage: "Inflammation of the bones",
    severity: "high",
    reasoning: "Bone inflammation can lead to severe pain, mobility issues, and potential bone damage if left untreated.",
  },
  "cardio-itis": {
    plainLanguage: "Inflammation of the heart",
    severity: "severe",
    reasoning: "Heart inflammation can be life-threatening as it affects the heart's ability to pump blood effectively.",
  },
  "dermato-itis": {
    plainLanguage: "Inflammation of the skin",
    severity: "moderate",
    reasoning: "While uncomfortable and potentially chronic, skin inflammation is usually manageable with proper treatment.",
  },
  // Add more combinations as needed
};

export const getExplanation = (prefix: string, suffix: string) => {
  const key = `${prefix}-${suffix}` as CombinationKey;
  return combinationExplanations[key] || {
    plainLanguage: "This combination needs medical review",
    severity: "moderate" as const,
    reasoning: "This specific combination requires professional medical interpretation.",
  };
};