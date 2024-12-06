import { CombinationKey, CombinationExplanation } from '../types';

export const dermoCombinations: Record<CombinationKey, CombinationExplanation> = {
  "dermo-itis": {
    plainLanguage: "Inflammation of the skin (Dermatitis)",
    severity: "moderate",
    reasoning: "Skin inflammation can cause discomfort and may require treatment.",
    pronunciation: "der-moh-eye-tis",
  },
  "dermo-cyte": {
    plainLanguage: "Skin cell (Dermocyte)",
    severity: "low",
    reasoning: "Basic cells that make up skin tissue.",
    pronunciation: "der-moh-site",
  },
  "dermo-pathy": {
    plainLanguage: "Disease of the skin (Dermopathy)",
    severity: "moderate",
    reasoning: "Skin diseases can affect quality of life and may require ongoing treatment.",
    pronunciation: "der-moh-path-ee",
  },
  "dermo-graphy": {
    plainLanguage: "Skin imaging (Dermography)",
    severity: "low",
    reasoning: "A non-invasive method to examine skin conditions.",
    pronunciation: "der-moh-graf-ee",
  },
  "dermo-scopy": {
    plainLanguage: "Visual examination of the skin (Dermoscopy)",
    severity: "low",
    reasoning: "A non-invasive procedure to examine skin lesions.",
    pronunciation: "der-moh-skop-ee",
  }
};