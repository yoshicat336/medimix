import { CombinationKey, CombinationExplanation } from '../types';

export const necroCombinations: Record<CombinationKey, CombinationExplanation> = {
  "necro-itis": {
    plainLanguage: "Inflammation of dead tissue (Necroitis)",
    severity: "severe",
    reasoning: "Inflammation of dead tissue can lead to serious infections and complications.",
    pronunciation: "nek-roh-eye-tis",
  },
  "necro-lysis": {
    plainLanguage: "Breakdown of dead tissue (Necrolysis)",
    severity: "high",
    reasoning: "The process of dead tissue breaking down can release toxins and cause complications.",
    pronunciation: "nek-roh-ly-sis",
  },
  "necro-sis": {
    plainLanguage: "Death of tissue (Necrosis)",
    severity: "severe",
    reasoning: "Cell death can lead to organ failure and other serious complications.",
    pronunciation: "nek-roh-sis",
  }
};