import { CombinationKey, CombinationExplanation } from '../types';

export const gastroCombinations: Record<CombinationKey, CombinationExplanation> = {
  "gastro-itis": {
    plainLanguage: "Inflammation of the stomach (Gastritis)",
    severity: "moderate",
    reasoning: "Stomach inflammation can cause pain and digestive issues.",
    pronunciation: "gas-troh-eye-tis",
  },
  "gastro-cyte": {
    plainLanguage: "Stomach cell (Gastrocyte)",
    severity: "low",
    reasoning: "Cells that make up stomach tissue.",
    pronunciation: "gas-troh-site",
  },
  "gastro-pathy": {
    plainLanguage: "Disease of the stomach (Gastropathy)",
    severity: "high",
    reasoning: "Stomach diseases can severely impact digestion and nutrition.",
    pronunciation: "gas-troh-path-ee",
  },
  "gastro-graphy": {
    plainLanguage: "Stomach imaging (Gastrography)",
    severity: "low",
    reasoning: "A diagnostic imaging procedure of the stomach.",
    pronunciation: "gas-troh-graf-ee",
  },
  "gastro-scopy": {
    plainLanguage: "Visual examination of the stomach (Gastroscopy)",
    severity: "moderate",
    reasoning: "An invasive procedure to examine stomach tissue directly.",
    pronunciation: "gas-troh-skop-ee",
  }
};