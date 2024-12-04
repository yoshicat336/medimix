export const prefixes = [
  { value: "osteo", label: "Osteo-", meaning: "bone" },
  { value: "cardio", label: "Cardio-", meaning: "heart" },
  { value: "dermat", label: "Dermat-", meaning: "skin" },
  { value: "gastro", label: "Gastro-", meaning: "stomach" },
  { value: "neuro", label: "Neuro-", meaning: "nerve/nervous system" },
  { value: "arthro", label: "Arthro-", meaning: "joint" },
  { value: "hepato", label: "Hepato-", meaning: "liver" },
  { value: "nephro", label: "Nephro-", meaning: "kidney" },
  { value: "pneumo", label: "Pneumo-", meaning: "lung" },
  { value: "rhino", label: "Rhino-", meaning: "nose" }
];

export const suffixes = [
  { value: "itis", label: "-itis", meaning: "inflammation" },
  { value: "ectomy", label: "-ectomy", meaning: "surgical removal" },
  { value: "ology", label: "-ology", meaning: "study of" },
  { value: "algia", label: "-algia", meaning: "pain" },
  { value: "oma", label: "-oma", meaning: "tumor" },
  { value: "plasty", label: "-plasty", meaning: "surgical repair" },
  { value: "scopy", label: "-scopy", meaning: "visual examination" },
  { value: "pathy", label: "-pathy", meaning: "disease" },
  { value: "megaly", label: "-megaly", meaning: "enlargement" },
  { value: "stenosis", label: "-stenosis", meaning: "narrowing" }
];

type CombinationKey = `${string}-${string}`;

export const combinationExplanations: Record<CombinationKey, {
  plainLanguage: string;
  severity: "low" | "moderate" | "high" | "severe";
  reasoning: string;
}> = {
  "osteo-itis": {
    plainLanguage: "Inflammation of the bones",
    severity: "high",
    reasoning: "Bone inflammation can lead to severe pain, mobility issues, and potential bone damage if left untreated.",
  },
  "cardio-itis": {
    plainLanguage: "Inflammation of the heart",
    severity: "severe",
    reasoning: "Heart inflammation can be life-threatening as it affects the heart's ability to pump blood effectively.",
  },
  "dermat-itis": {
    plainLanguage: "Inflammation of the skin",
    severity: "moderate",
    reasoning: "While uncomfortable and potentially chronic, skin inflammation is usually manageable with proper treatment.",
  },
  "hepato-itis": {
    plainLanguage: "Inflammation of the liver",
    severity: "high",
    reasoning: "Liver inflammation can severely impact vital metabolic functions and may lead to organ damage.",
  },
  "nephro-itis": {
    plainLanguage: "Inflammation of the kidneys",
    severity: "high",
    reasoning: "Kidney inflammation can disrupt fluid balance and waste removal, potentially leading to kidney failure.",
  },
  "cardio-ectomy": {
    plainLanguage: "Surgical removal of heart tissue",
    severity: "severe",
    reasoning: "Any surgical procedure involving the heart carries significant risks and requires careful consideration.",
  },
  "arthro-plasty": {
    plainLanguage: "Surgical repair of a joint",
    severity: "moderate",
    reasoning: "While major surgery, joint repair procedures are common and have well-established recovery protocols.",
  },
  "gastro-scopy": {
    plainLanguage: "Visual examination of the stomach",
    severity: "low",
    reasoning: "A routine diagnostic procedure with minimal risks when performed by qualified professionals.",
  }
};

const generatePlainLanguage = (prefix: string, suffix: string): string => {
  const prefixObj = prefixes.find(p => p.value === prefix);
  const suffixObj = suffixes.find(s => s.value === suffix);
  
  if (!prefixObj || !suffixObj) return "Invalid combination";
  
  switch (suffix) {
    case "itis":
      return `Inflammation of the ${prefixObj.meaning}`;
    case "ectomy":
      return `Surgical removal of the ${prefixObj.meaning}`;
    case "ology":
      return `Study of the ${prefixObj.meaning}`;
    case "algia":
      return `Pain in the ${prefixObj.meaning}`;
    case "oma":
      return `Tumor of the ${prefixObj.meaning}`;
    case "plasty":
      return `Surgical repair of the ${prefixObj.meaning}`;
    case "scopy":
      return `Visual examination of the ${prefixObj.meaning}`;
    case "pathy":
      return `Disease of the ${prefixObj.meaning}`;
    case "megaly":
      return `Enlargement of the ${prefixObj.meaning}`;
    case "stenosis":
      return `Narrowing of the ${prefixObj.meaning}`;
    default:
      return "Unknown combination";
  }
};

const determineSeverity = (prefix: string, suffix: string): "low" | "moderate" | "high" | "severe" => {
  // High-risk organs/systems
  const highRiskPrefixes = ["cardio", "neuro", "hepato", "nephro"];
  // High-risk procedures/conditions
  const highRiskSuffixes = ["ectomy", "oma"];
  
  if (highRiskPrefixes.includes(prefix) && highRiskSuffixes.includes(suffix)) {
    return "severe";
  } else if (highRiskPrefixes.includes(prefix) || highRiskSuffixes.includes(suffix)) {
    return "high";
  } else if (suffix === "itis" || suffix === "pathy") {
    return "moderate";
  }
  return "low";
};

const generateReasoning = (prefix: string, suffix: string, severity: "low" | "moderate" | "high" | "severe"): string => {
  const prefixObj = prefixes.find(p => p.value === prefix);
  const suffixObj = suffixes.find(s => s.value === suffix);
  
  if (!prefixObj || !suffixObj) return "Unable to determine reasoning for invalid combination";
  
  const organ = prefixObj.meaning;
  const condition = suffixObj.meaning;
  
  switch (severity) {
    case "severe":
      return `This condition involves critical intervention with the ${organ}, which is essential for survival. The ${condition} presents significant risks and requires immediate medical attention.`;
    case "high":
      return `The ${organ} is a vital component of body function. Any ${condition} requires careful medical supervision and treatment.`;
    case "moderate":
      return `While the ${condition} of the ${organ} requires medical attention, it is generally manageable with appropriate treatment.`;
    case "low":
      return `This is typically a routine medical procedure or condition involving the ${organ}. While medical attention is needed, risks are minimal when properly managed.`;
  }
};

export const getExplanation = (prefix: string, suffix: string) => {
  const key = `${prefix}-${suffix}` as CombinationKey;
  const existingExplanation = combinationExplanations[key];
  
  if (existingExplanation) {
    return existingExplanation;
  }
  
  // Generate explanation for non-existing combinations
  const plainLanguage = generatePlainLanguage(prefix, suffix);
  const severity = determineSeverity(prefix, suffix);
  const reasoning = generateReasoning(prefix, suffix, severity);
  
  return {
    plainLanguage,
    severity,
    reasoning
  };
};