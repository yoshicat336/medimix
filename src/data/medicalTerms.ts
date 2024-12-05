type SeverityLevel = "low" | "moderate" | "high" | "severe";
type CombinationKey = `${string}-${string}`;

interface PrefixSuffix {
  value: string;
  label: string;
  meaning: string;
}

export const prefixes: PrefixSuffix[] = [
  { value: "pulmo", label: "Pulmo-", meaning: "Relating to lungs" },
  { value: "endo", label: "Endo-", meaning: "Inside" },
  { value: "myo", label: "Myo-", meaning: "Muscle" },
  { value: "lipo", label: "Lipo-", meaning: "Fat" },
];

export const suffixes: PrefixSuffix[] = [
  { value: "itis", label: "-itis", meaning: "Inflammation" },
  { value: "ectomy", label: "-ectomy", meaning: "Surgical removal" },
  { value: "ology", label: "-ology", meaning: "Study of" },
  { value: "algia", label: "-algia", meaning: "Pain" },
  { value: "genesis", label: "-genesis", meaning: "Origin/creation" },
  { value: "plasty", label: "-plasty", meaning: "Surgical repair" },
  { value: "sclerosis", label: "-sclerosis", meaning: "Hardening" },
  { value: "tomy", label: "-tomy", meaning: "Cutting into" },
];

export const combinationExplanations: Record<CombinationKey, {
  plainLanguage: string;
  severity: SeverityLevel;
  reasoning: string;
  pronunciation: string;
}> = {
  // Pulmo combinations
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
  "pulmo-ology": {
    plainLanguage: "Study of the lungs (Pulmonology)",
    severity: "low",
    reasoning: "Pulmonology is a medical specialty focused on the study and treatment of lung diseases, typically not an emergency condition.",
    pronunciation: "pool-moh-ol-oh-jee",
  },
  "pulmo-algia": {
    plainLanguage: "Lung pain (Pulmalgia)",
    severity: "high",
    reasoning: "Pain in the lungs can indicate serious conditions such as infections or pleuritis and requires immediate attention.",
    pronunciation: "pool-moh-al-jee-ah",
  },

  // Endo combinations
  "endo-itis": {
    plainLanguage: "Inflammation of an internal organ (Endometritis)",
    severity: "high",
    reasoning: "Endometrial inflammation can cause severe complications such as infertility or infection if not treated.",
    pronunciation: "en-doh-eye-tis",
  },
  "endo-ectomy": {
    plainLanguage: "Surgical removal of an internal organ (Endectomy)",
    severity: "high",
    reasoning: "Removal of an internal organ, such as the uterus, is a major surgery with significant risks and a long recovery time.",
    pronunciation: "en-doh-ek-toh-mee",
  },
  "endo-ology": {
    plainLanguage: "Study of internal organs (Endology)",
    severity: "low",
    reasoning: "Endology is the study of internal organs, not typically associated with urgent medical issues unless there is a related disorder.",
    pronunciation: "en-doh-ol-oh-jee",
  },
  "endo-genesis": {
    plainLanguage: "Origin or creation of internal conditions (Endogenesis)",
    severity: "moderate",
    reasoning: "The creation or origin of internal conditions, such as tumor growth or infection, may be serious but often requires diagnostic tests for evaluation.",
    pronunciation: "en-doh-jen-eh-sis",
  },

  // Myo combinations
  "myo-itis": {
    plainLanguage: "Inflammation of the muscle (Myositis)",
    severity: "moderate",
    reasoning: "Muscle inflammation can lead to pain and weakness but is generally treatable with anti-inflammatory medications.",
    pronunciation: "my-oh-eye-tis",
  },
  "myo-plasty": {
    plainLanguage: "Surgical repair of muscle (Myoplasty)",
    severity: "moderate",
    reasoning: "Muscle repair surgery is required after injury or damage and involves moderate recovery, depending on the muscle's function.",
    pronunciation: "my-oh-plas-tee",
  },
  "myo-sclerosis": {
    plainLanguage: "Hardening of the muscle (Myosclerosis)",
    severity: "high",
    reasoning: "Muscle hardening can indicate a chronic condition, such as muscular dystrophy, requiring long-term care and monitoring.",
    pronunciation: "my-oh-sklehr-oh-sis",
  },
  "myo-tomy": {
    plainLanguage: "Surgical incision of the muscle (Myotomy)",
    severity: "high",
    reasoning: "A myotomy involves cutting the muscle, typically for conditions like esophageal disorders, and requires careful post-surgical care.",
    pronunciation: "my-oh-toh-mee",
  },

  // Lipo combinations
  "lipo-itis": {
    plainLanguage: "Inflammation of fat tissue (Lipitis)",
    severity: "moderate",
    reasoning: "Fat tissue inflammation, such as in lipomas or cellulitis, can lead to discomfort and swelling but is typically treatable.",
    pronunciation: "lye-poh-eye-tis",
  },
  "lipo-ectomy": {
    plainLanguage: "Surgical removal of fat (Lipoectomy)",
    severity: "moderate",
    reasoning: "Fat removal surgery, commonly performed for cosmetic or medical reasons, carries moderate risks and requires careful post-operative care.",
    pronunciation: "lye-poh-ek-toh-mee",
  },
  "lipo-ology": {
    plainLanguage: "Study of fat (Lipidology)",
    severity: "low",
    reasoning: "Lipidology involves the study of fats and lipid metabolism, typically not associated with urgent medical issues.",
    pronunciation: "lye-poh-ol-oh-jee",
  },
  "lipo-sclerosis": {
    plainLanguage: "Hardening of fat tissue (Liposclerosis)",
    severity: "high",
    reasoning: "Liposclerosis refers to hardening or scarring of fat tissue, which may indicate chronic conditions such as lipodystrophy.",
    pronunciation: "lye-poh-sklehr-oh-sis",
  },
};

export const getExplanation = (prefix: string, suffix: string) => {
  const key = `${prefix}-${suffix}` as CombinationKey;
  return combinationExplanations[key];
};