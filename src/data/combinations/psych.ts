import { CombinationKey, CombinationExplanation } from '../types';

export const psychCombinations: Record<CombinationKey, CombinationExplanation> = {
  "psych-osis": {
    plainLanguage: "Mental condition (Psychosis)",
    severity: "severe",
    reasoning: "Serious mental health condition affecting perception of reality.",
    pronunciation: "sigh-koh-sis",
  },
  "psych-iatry": {
    plainLanguage: "Mental health treatment (Psychiatry)",
    severity: "low",
    reasoning: "Medical specialty focused on mental health diagnosis and treatment.",
    pronunciation: "sigh-kye-ah-tree",
  },
  "psych-ology": {
    plainLanguage: "Study of the mind (Psychology)",
    severity: "low",
    reasoning: "Scientific study of behavior and mental processes.",
    pronunciation: "sigh-kol-oh-jee",
  }
};