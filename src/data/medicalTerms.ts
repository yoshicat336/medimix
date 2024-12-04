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
  { value: "rhino", label: "Rhino-", meaning: "nose" },
  { value: "ophthalmo", label: "Ophthalmo-", meaning: "eye" },
  { value: "oto", label: "Oto-", meaning: "ear" },
  { value: "hemato", label: "Hemato-", meaning: "blood" },
  { value: "myelo", label: "Myelo-", meaning: "bone marrow/spinal cord" },
  { value: "adeno", label: "Adeno-", meaning: "gland" }
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
  { value: "stenosis", label: "-stenosis", meaning: "narrowing" },
  { value: "osis", label: "-osis", meaning: "abnormal condition" },
  { value: "gram", label: "-gram", meaning: "visual record" },
  { value: "rrhea", label: "-rrhea", meaning: "flow/discharge" },
  { value: "phobia", label: "-phobia", meaning: "fear" },
  { value: "lysis", label: "-lysis", meaning: "breakdown/destruction" }
];

type CombinationKey = `${string}-${string}`;

export const combinationExplanations: Record<CombinationKey, {
  plainLanguage: string;
  severity: "low" | "moderate" | "high" | "severe";
  reasoning: string;
}> = {
  "cardio-itis": {
    plainLanguage: "Inflammation of the heart (Myocarditis)",
    severity: "severe",
    reasoning: "Heart inflammation can severely impact cardiac function and may be life-threatening if left untreated. Immediate medical attention is required.",
  },
  "dermat-itis": {
    plainLanguage: "Inflammation of the skin (Dermatitis)",
    severity: "moderate",
    reasoning: "While skin inflammation can be uncomfortable and affect quality of life, it's usually manageable with proper treatment and rarely life-threatening.",
  },
  "nephro-itis": {
    plainLanguage: "Inflammation of the kidneys (Nephritis)",
    severity: "high",
    reasoning: "Kidney inflammation can disrupt vital filtration functions and lead to serious complications if not properly treated.",
  },
  "ophthalmo-itis": {
    plainLanguage: "Inflammation of the eye (Ophthalmitis)",
    severity: "high",
    reasoning: "Eye inflammation requires immediate attention as it can potentially lead to vision loss if not treated promptly.",
  },
  "cardio-ectomy": {
    plainLanguage: "Surgical removal of heart tissue",
    severity: "severe",
    reasoning: "Any surgical procedure involving the heart carries significant risks and requires extensive planning and expertise.",
  },
  "nephro-ectomy": {
    plainLanguage: "Surgical removal of a kidney (Nephrectomy)",
    severity: "high",
    reasoning: "While humans can function with one kidney, the surgery itself carries significant risks and requires careful post-operative monitoring.",
  },
  "hemato-oma": {
    plainLanguage: "Blood-related tumor (Hematoma)",
    severity: "moderate",
    reasoning: "Blood-filled swellings can vary in severity but often resolve with proper medical attention and time.",
  },
  "neuro-oma": {
    plainLanguage: "Nerve tissue tumor (Neuroma)",
    severity: "high",
    reasoning: "Tumors affecting nerve tissue can cause significant pain and neurological symptoms, requiring careful medical management.",
  },
  "gastro-scopy": {
    plainLanguage: "Visual examination of the stomach (Gastroscopy)",
    severity: "low",
    reasoning: "A routine diagnostic procedure that, while invasive, is generally safe when performed by qualified professionals.",
  },
  "arthro-plasty": {
    plainLanguage: "Surgical repair of a joint (Arthroplasty)",
    severity: "moderate",
    reasoning: "Joint replacement surgery is a common but major procedure requiring significant rehabilitation time.",
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
    case "osis":
      return `Abnormal condition of the ${prefixObj.meaning}`;
    case "gram":
      return `Visual record of the ${prefixObj.meaning}`;
    case "rrhea":
      return `Abnormal discharge from the ${prefixObj.meaning}`;
    case "phobia":
      return `Fear of conditions related to the ${prefixObj.meaning}`;
    case "lysis":
      return `Breakdown or destruction of the ${prefixObj.meaning}`;
    default:
      return "Unknown combination";
  }
};

const determineSeverity = (prefix: string, suffix: string): "low" | "moderate" | "high" | "severe" => {
  // Special case for Myelolysis
  if (prefix === "myelo" && suffix === "lysis") {
    return "severe";
  }
  
  const criticalOrgans = ["cardio", "neuro", "hepato", "nephro", "pneumo"];
  const majorProcedures = ["ectomy", "plasty"];
  const seriousConditions = ["oma", "itis", "stenosis"];
  
  if (criticalOrgans.includes(prefix) && (majorProcedures.includes(suffix) || seriousConditions.includes(suffix))) {
    return "severe";
  } else if (criticalOrgans.includes(prefix) || (majorProcedures.includes(suffix) || suffix === "oma")) {
    return "high";
  } else if (seriousConditions.includes(suffix)) {
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
  
  const severityDescriptions = {
    severe: [
      `This condition involves critical intervention with the ${organ}, which is essential for survival.`,
      `Any medical procedures involving the ${organ} carry significant risks and require immediate attention.`,
      `The combination of ${condition} affecting the ${organ} presents serious health risks.`
    ],
    high: [
      `The ${organ} plays a vital role in body function, and this ${condition} requires careful medical supervision.`,
      `Conditions affecting the ${organ} need prompt medical attention to prevent complications.`,
      `This medical situation involving the ${organ} requires specialized care and monitoring.`
    ],
    moderate: [
      `While affecting the ${organ}, this condition is generally manageable with appropriate medical care.`,
      `Regular monitoring and treatment of the ${organ} condition is necessary but not usually urgent.`,
      `This ${condition} of the ${organ} typically responds well to standard treatments.`
    ],
    low: [
      `This is a routine medical procedure or condition involving the ${organ}.`,
      `When properly managed, this ${condition} of the ${organ} presents minimal risks.`,
      `Standard medical protocols for the ${organ} are usually sufficient for this condition.`
    ]
  };

  const randomIndex = Math.floor(Math.random() * 3);
  return severityDescriptions[severity][randomIndex];
};

export const getExplanation = (prefix: string, suffix: string) => {
  const key = `${prefix}-${suffix}` as CombinationKey;
  const existingExplanation = combinationExplanations[key];
  
  if (existingExplanation) {
    return existingExplanation;
  }
  
  const plainLanguage = generatePlainLanguage(prefix, suffix);
  const severity = determineSeverity(prefix, suffix);
  const reasoning = generateReasoning(prefix, suffix, severity);
  
  return {
    plainLanguage,
    severity,
    reasoning
  };
};