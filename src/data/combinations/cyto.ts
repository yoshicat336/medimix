import { CombinationKey, CombinationExplanation } from '../types';

export const cytoCombinations: Record<CombinationKey, CombinationExplanation> = {
  "cyto-itis": {
    plainLanguage: "Cell inflammation (Cytoitis)",
    severity: "moderate",
    reasoning: "Cellular inflammation can disrupt normal cell function.",
    pronunciation: "sigh-toh-eye-tis",
  },
  "cyto-lysis": {
    plainLanguage: "Cell breakdown (Cytolysis)",
    severity: "high",
    reasoning: "Cell breakdown can lead to tissue damage and organ dysfunction.",
    pronunciation: "sigh-toh-ly-sis",
  },
  "cyto-genesis": {
    plainLanguage: "Cell formation (Cytogenesis)",
    severity: "low",
    reasoning: "Normal process of cell formation and development.",
    pronunciation: "sigh-toh-jen-eh-sis",
  }
};