import { CombinationKey, CombinationExplanation } from '../types';

export const cardioCombinations: Record<CombinationKey, CombinationExplanation> = {
  "cardio-itis": {
    plainLanguage: "Inflammation of the heart (Carditis)",
    severity: "severe",
    reasoning: "Heart inflammation can be life-threatening and requires immediate medical attention.",
    pronunciation: "car-dee-oh-eye-tis",
  },
  "cardio-cyte": {
    plainLanguage: "Heart cell (Cardiocyte)",
    severity: "low",
    reasoning: "Specialized cells that make up heart tissue.",
    pronunciation: "car-dee-oh-site",
  },
  "cardio-pathy": {
    plainLanguage: "Disease of the heart (Cardiopathy)",
    severity: "severe",
    reasoning: "Heart diseases can be life-threatening and often require ongoing medical care.",
    pronunciation: "car-dee-oh-path-ee",
  },
  "cardio-graphy": {
    plainLanguage: "Recording of heart activity (Cardiography)",
    severity: "low",
    reasoning: "A diagnostic procedure to record heart activity, typically non-invasive.",
    pronunciation: "car-dee-oh-graf-ee",
  },
  "cardio-scopy": {
    plainLanguage: "Visual examination of the heart (Cardioscopy)",
    severity: "moderate",
    reasoning: "An invasive procedure to examine heart tissue directly.",
    pronunciation: "car-dee-oh-skop-ee",
  }
};