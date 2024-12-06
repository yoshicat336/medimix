import { CombinationKey, CombinationExplanation } from '../types';

export const myoCombinations: Record<CombinationKey, CombinationExplanation> = {
  "myo-itis": {
    plainLanguage: "Muscle inflammation (Myositis)",
    severity: "moderate",
    reasoning: "Muscle inflammation can cause pain and limit movement.",
    pronunciation: "my-oh-eye-tis",
  },
  "myo-pathy": {
    plainLanguage: "Muscle disease (Myopathy)",
    severity: "high",
    reasoning: "Muscle diseases can significantly impact mobility and quality of life.",
    pronunciation: "my-oh-path-ee",
  },
  "myo-lysis": {
    plainLanguage: "Muscle breakdown (Myolysis)",
    severity: "high",
    reasoning: "Muscle tissue breakdown can release harmful substances into the bloodstream.",
    pronunciation: "my-oh-ly-sis",
  }
};