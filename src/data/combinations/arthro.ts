import { CombinationKey, CombinationExplanation } from '../types';

export const arthroCombinations: Record<CombinationKey, CombinationExplanation> = {
  "arthro-itis": {
    plainLanguage: "Joint inflammation (Arthritis)",
    severity: "high",
    reasoning: "Joint inflammation can cause chronic pain and reduced mobility.",
    pronunciation: "ar-throh-eye-tis",
  },
  "arthro-plasty": {
    plainLanguage: "Joint repair surgery (Arthroplasty)",
    severity: "severe",
    reasoning: "Major surgery to repair or replace a joint.",
    pronunciation: "ar-throh-plas-tee",
  },
  "arthro-scopy": {
    plainLanguage: "Joint examination (Arthroscopy)",
    severity: "moderate",
    reasoning: "Minimally invasive procedure to examine joint conditions.",
    pronunciation: "ar-throh-skoh-pee",
  },
  "arthro-pathy": {
    plainLanguage: "A disease that affects the joints, such as arthritis or gout. (Arthropathy)",
    severity: "moderate",
    reasoning: "Severity varies.",
    pronunciation: "ar-throh-pah-thee",
  },
};
