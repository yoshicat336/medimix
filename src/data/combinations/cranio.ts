import { CombinationKey, CombinationExplanation } from '../types';

export const cranioCombinations: Record<CombinationKey, CombinationExplanation> = {
  "cranio-itis": {
    plainLanguage: "Inflammation of the skull (Craniitis)",
    severity: "high",
    reasoning: "Skull inflammation can affect brain function and cause severe pain.",
    pronunciation: "cray-nee-oh-eye-tis",
  },
  "cranio-cyte": {
    plainLanguage: "Skull cell (Craniocyte)",
    severity: "low",
    reasoning: "Cells that make up skull tissue.",
    pronunciation: "cray-nee-oh-site",
  },
  "cranio-pathy": {
    plainLanguage: "Disease of the skull (Craniopathy)",
    severity: "high",
    reasoning: "Skull diseases can affect brain protection and cause serious complications.",
    pronunciation: "cray-nee-oh-path-ee",
  },
  "cranio-graphy": {
    plainLanguage: "Skull imaging (Craniography)",
    severity: "low",
    reasoning: "A diagnostic imaging procedure of the skull.",
    pronunciation: "cray-nee-oh-graf-ee",
  },
  "cranio-scopy": {
    plainLanguage: "Visual examination of the skull (Cranioscopy)",
    severity: "moderate",
    reasoning: "Examination of skull structure and abnormalities.",
    pronunciation: "cray-nee-oh-skop-ee",
  }
};