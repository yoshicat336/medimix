import { CombinationKey, CombinationExplanation } from '../types';

export const osteoCombinations: Record<CombinationKey, CombinationExplanation> = {
  "osteo-itis": {
    plainLanguage: "Inflammation of the bone (Osteitis)",
    severity: "high",
    reasoning: "Bone inflammation can cause severe pain and affect mobility.",
    pronunciation: "os-tee-oh-eye-tis",
  },
  "osteo-cyte": {
    plainLanguage: "Bone cell (Osteocyte)",
    severity: "low",
    reasoning: "Basic cells that make up bone tissue.",
    pronunciation: "os-tee-oh-site",
  },
  "osteo-pathy": {
    plainLanguage: "Disease of the bone (Osteopathy)",
    severity: "high",
    reasoning: "Bone diseases can significantly impact mobility and quality of life.",
    pronunciation: "os-tee-oh-path-ee",
  },
  "osteo-graphy": {
    plainLanguage: "Bone imaging (Osteography)",
    severity: "low",
    reasoning: "A diagnostic imaging procedure of bones.",
    pronunciation: "os-tee-oh-graf-ee",
  },
  "osteo-scopy": {
    plainLanguage: "Visual examination of bones (Osteoscopy)",
    severity: "moderate",
    reasoning: "An invasive procedure to examine bone tissue directly.",
    pronunciation: "os-tee-oh-skop-ee",
  }
};