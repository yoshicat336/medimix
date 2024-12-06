import { CombinationKey, CombinationExplanation } from '../types';

export const hemoCombinations: Record<CombinationKey, CombinationExplanation> = {
  "hemo-lysis": {
    plainLanguage: "Blood cell destruction (Hemolysis)",
    severity: "high",
    reasoning: "Breakdown of red blood cells can lead to anemia and other complications.",
    pronunciation: "hee-moh-lie-sis",
  },
  "hemo-philia": {
    plainLanguage: "Blood clotting disorder (Hemophilia)",
    severity: "severe",
    reasoning: "Genetic disorder affecting blood's ability to clot properly.",
    pronunciation: "hee-moh-fill-ee-ah",
  },
  "hemo-stasis": {
    plainLanguage: "Blood flow stoppage (Hemostasis)",
    severity: "moderate",
    reasoning: "Natural process of blood clotting to prevent excessive bleeding.",
    pronunciation: "hee-moh-stay-sis",
  }
};