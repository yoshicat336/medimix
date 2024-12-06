import { CombinationKey, CombinationExplanation } from '../types';

export const endoCombinations: Record<CombinationKey, CombinationExplanation> = {
  "endo-itis": {
    plainLanguage: "Internal inflammation (Endoitis)",
    severity: "high",
    reasoning: "Internal inflammation can affect multiple organ systems.",
    pronunciation: "en-doh-eye-tis",
  },
  "endo-scopy": {
    plainLanguage: "Internal examination (Endoscopy)",
    severity: "moderate",
    reasoning: "Procedure to examine internal organs using a specialized instrument.",
    pronunciation: "en-doh-skoh-pee",
  },
  "endo-plasty": {
    plainLanguage: "Internal surgical repair (Endoplasty)",
    severity: "severe",
    reasoning: "Major surgery to repair internal structures.",
    pronunciation: "en-doh-plas-tee",
  }
};