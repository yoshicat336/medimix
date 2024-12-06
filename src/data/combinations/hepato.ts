import { CombinationKey, CombinationExplanation } from '../types';

export const hepatoCombinations: Record<CombinationKey, CombinationExplanation> = {
  "hepato-itis": {
    plainLanguage: "Inflammation of the liver (Hepatitis)",
    severity: "high",
    reasoning: "Liver inflammation can lead to serious complications and may become chronic.",
    pronunciation: "hep-ah-toe-eye-tis",
  },
  "hepato-cyte": {
    plainLanguage: "Liver cell (Hepatocyte)",
    severity: "low",
    reasoning: "Basic functional cells of the liver.",
    pronunciation: "hep-ah-toe-site",
  },
  "hepato-pathy": {
    plainLanguage: "Disease of the liver (Hepatopathy)",
    severity: "high",
    reasoning: "Liver diseases can severely impact overall health and body function.",
    pronunciation: "hep-ah-toe-path-ee",
  },
  "hepato-graphy": {
    plainLanguage: "Imaging of the liver (Hepatography)",
    severity: "low",
    reasoning: "A diagnostic imaging procedure of the liver.",
    pronunciation: "hep-ah-toe-graf-ee",
  },
  "hepato-scopy": {
    plainLanguage: "Visual examination of the liver (Hepatoscopy)",
    severity: "moderate",
    reasoning: "An invasive procedure to examine liver tissue directly.",
    pronunciation: "hep-ah-toe-skop-ee",
  }
};