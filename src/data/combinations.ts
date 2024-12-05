import { CombinationKey, CombinationExplanation } from './types';

export const combinationExplanations: Record<CombinationKey, CombinationExplanation> = {
  "pulmo-itis": {
    plainLanguage: "Inflammation of the lungs (Pneumonitis)",
    severity: "high",
    reasoning: "Lung inflammation can cause difficulty breathing and may lead to severe respiratory issues or pneumonia if left untreated.",
    pronunciation: "pool-moh-eye-tis",
  },
  "pulmo-ectomy": {
    plainLanguage: "Surgical removal of the lung (Pulmectomy)",
    severity: "severe",
    reasoning: "Removal of a lung is a major surgery typically performed in cases of lung cancer or severe infection, with high risks and long recovery time.",
    pronunciation: "pool-moh-ek-toh-mee",
  },
  "neuro-pathy": {
    plainLanguage: "Disease of the nerves (Neuropathy)",
    severity: "high",
    reasoning: "Nerve disease can cause serious sensory and motor function issues.",
    pronunciation: "new-roh-path-ee",
  },
  "cardio-graphy": {
    plainLanguage: "Heart recording (Cardiography)",
    severity: "low",
    reasoning: "A diagnostic procedure to record heart activity, not a condition itself.",
    pronunciation: "car-dee-og-ra-fee",
  },
  "hepato-oma": {
    plainLanguage: "Liver tumor (Hepatoma)",
    severity: "severe",
    reasoning: "Liver tumors can be life-threatening and often require immediate medical intervention.",
    pronunciation: "hep-a-toe-oh-ma",
  },
  "dermo-itis": {
    plainLanguage: "Skin inflammation (Dermatitis)",
    severity: "moderate",
    reasoning: "Skin inflammation can cause discomfort and may require medical treatment.",
    pronunciation: "der-moh-eye-tis",
  },
  "osteo-porosis": {
    plainLanguage: "Bone condition (Osteoporosis)",
    severity: "high",
    reasoning: "Weakening of bones can lead to serious fractures and complications.",
    pronunciation: "os-tee-oh-por-oh-sis",
  },
  "cranio-plasty": {
    plainLanguage: "Skull repair surgery (Cranioplasty)",
    severity: "severe",
    reasoning: "Major surgical procedure to repair skull defects, requiring extensive recovery.",
    pronunciation: "cray-nee-oh-plas-tee",
  }
};