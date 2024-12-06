import { CombinationKey, CombinationExplanation } from '../types';

export const lipoCombinations: Record<CombinationKey, CombinationExplanation> = {
  "lipo-itis": {
    plainLanguage: "Inflammation of fat tissue (Lipitis)",
    severity: "moderate",
    reasoning: "Fat tissue inflammation can cause pain and metabolic issues.",
    pronunciation: "lie-poh-eye-tis",
  },
  "lipo-cyte": {
    plainLanguage: "Fat cell (Lipocyte)",
    severity: "low",
    reasoning: "Basic cells that store and process fat in the body.",
    pronunciation: "lie-poh-site",
  },
  "lipo-lysis": {
    plainLanguage: "Breaking down of fat (Lipolysis)",
    severity: "low",
    reasoning: "Natural process of fat breakdown in the body.",
    pronunciation: "lie-poh-lie-sis",
  }
};