import { CombinationKey, CombinationExplanation } from '../types';

export const ophtalmoCombinations: Record<CombinationKey, CombinationExplanation> = {
  "ophtalmo-logy": {
    plainLanguage: "Study of eyes (Ophthalmology)",
    severity: "low",
    reasoning: "Medical specialty focused on eye health and treatment.",
    pronunciation: "off-thal-mol-oh-jee",
  },
  "ophtalmo-scopy": {
    plainLanguage: "Eye examination (Ophthalmoscopy)",
    severity: "low",
    reasoning: "Visual examination of the interior of the eye.",
    pronunciation: "off-thal-mos-koh-pee",
  },
  "ophtalmo-plegia": {
    plainLanguage: "Eye paralysis (Ophthalmoplegia)",
    severity: "high",
    reasoning: "Paralysis or weakness of the eye muscles.",
    pronunciation: "off-thal-moh-plee-jee-ah",
  }
};