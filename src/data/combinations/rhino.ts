import { CombinationKey, CombinationExplanation } from '../types';

export const rhinoCombinations: Record<CombinationKey, CombinationExplanation> = {
  "rhino-plasty": {
    plainLanguage: "Nose surgery (Rhinoplasty)",
    severity: "moderate",
    reasoning: "Surgical procedure to reshape or repair the nose.",
    pronunciation: "rye-noh-plas-tee",
  },
  "rhino-scopy": {
    plainLanguage: "Nose examination (Rhinoscopy)",
    severity: "low",
    reasoning: "Visual examination of the nasal passages.",
    pronunciation: "rye-noh-skoh-pee",
  },
  "rhino-itis": {
    plainLanguage: "Nose inflammation (Rhinitis)",
    severity: "low",
    reasoning: "Inflammation of the nasal passages, often causing congestion.",
    pronunciation: "rye-noh-eye-tis",
  }
};