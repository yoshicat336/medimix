import { CombinationKey, CombinationExplanation } from '../types';

export const pneumoCombinations: Record<CombinationKey, CombinationExplanation> = {
  "pneumo-itis": {
    plainLanguage: "Lung inflammation (Pneumonitis)",
    severity: "high",
    reasoning: "Inflammation of lung tissue can severely impact breathing.",
    pronunciation: "new-moh-eye-tis",
  },
  "pneumo-nia": {
    plainLanguage: "Lung infection (Pneumonia)",
    severity: "severe",
    reasoning: "Serious infection of the lungs that can be life-threatening.",
    pronunciation: "new-moh-nee-ah",
  },
  "pneumo-thorax": {
    plainLanguage: "Collapsed lung (Pneumothorax)",
    severity: "severe",
    reasoning: "Air in the chest cavity causing lung collapse, requires immediate treatment.",
    pronunciation: "new-moh-thor-ax",
  }
};