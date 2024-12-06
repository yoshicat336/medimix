import { CombinationKey, CombinationExplanation } from '../types';

export const thoracoCombinations: Record<CombinationKey, CombinationExplanation> = {
  "thoraco-tomy": {
    plainLanguage: "Chest incision (Thoracotomy)",
    severity: "severe",
    reasoning: "Major surgical procedure involving opening the chest cavity.",
    pronunciation: "thor-ah-kot-oh-mee",
  },
  "thoraco-plasty": {
    plainLanguage: "Chest repair surgery (Thoracoplasty)",
    severity: "severe",
    reasoning: "Surgical reconstruction of the chest wall.",
    pronunciation: "thor-ah-koh-plas-tee",
  },
  "thoraco-scopy": {
    plainLanguage: "Chest examination (Thoracoscopy)",
    severity: "moderate",
    reasoning: "Minimally invasive procedure to examine the chest cavity.",
    pronunciation: "thor-ah-kos-koh-pee",
  }
};