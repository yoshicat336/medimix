import { CombinationKey, CombinationExplanation } from './types';

export const combinationExplanations: Record<CombinationKey, CombinationExplanation> = {
  // Pulmo combinations
  "pulmo-itis": {
    plainLanguage: "Inflammation of the lungs (Pneumonitis)",
    severity: "high",
    reasoning: "Lung inflammation can cause difficulty breathing and may lead to severe respiratory issues or pneumonia if left untreated.",
    pronunciation: "pool-moh-eye-tis",
  },
  "pulmo-cyte": {
    plainLanguage: "Lung cell (Pulmocyte)",
    severity: "low",
    reasoning: "Pulmocytes are essential for lung function and gas exchange.",
    pronunciation: "pool-moh-site",
  },
  "pulmo-pathy": {
    plainLanguage: "Disease of the lungs (Pulmopathy)",
    severity: "high",
    reasoning: "Any disease affecting lung function can have significant impacts on breathing and overall health.",
    pronunciation: "pool-moh-path-ee",
  },
  "pulmo-graphy": {
    plainLanguage: "Process of recording lung activity (Pulmography)",
    severity: "low",
    reasoning: "A diagnostic procedure used to analyze lung function, typically non-invasive.",
    pronunciation: "pool-moh-graf-ee",
  },
  "pulmo-scopy": {
    plainLanguage: "Visual examination of the lungs (Pulmoscopy)",
    severity: "moderate",
    reasoning: "Pulmoscopy is performed to investigate lung abnormalities, often involving invasive techniques.",
    pronunciation: "pool-moh-skop-ee",
  },
  "pulmo-lysis": {
    plainLanguage: "Breaking down of lung tissue (Pulmolysis)",
    severity: "high",
    reasoning: "Pulmolysis refers to severe lung tissue breakdown that could lead to respiratory failure.",
    pronunciation: "pool-moh-ly-sis",
  },
  "pulmo-phobia": {
    plainLanguage: "Fear of the lungs (Pulmophobia)",
    severity: "low",
    reasoning: "Pulmophobia refers to an irrational fear related to breathing or lung health.",
    pronunciation: "pool-moh-foh-bee-ah",
  },
  "pulmo-mania": {
    plainLanguage: "Excessive excitement about lungs (Pulmomaniac)",
    severity: "low",
    reasoning: "This refers to excessive obsession or excitement related to lung health.",
    pronunciation: "pool-moh-may-nee-ah",
  },
  "pulmo-plasia": {
    plainLanguage: "Formation of lung tissue (Pulmoplasia)",
    severity: "moderate",
    reasoning: "This refers to the growth or abnormal formation of lung tissue.",
    pronunciation: "pool-moh-play-zee-ah",
  },
  "pulmo-ectomy": {
    plainLanguage: "Surgical removal of the lung (Pulmectomy)",
    severity: "severe",
    reasoning: "Removal of a lung is a major surgery typically performed in cases of lung cancer or severe infection, with high risks and long recovery time.",
    pronunciation: "pool-moh-ek-toh-mee",
  },
  "pulmo-ology": {
    plainLanguage: "Study of lung health (Pulmology)",
    severity: "low",
    reasoning: "The study of lung health and diseases, typically pursued as a medical specialty.",
    pronunciation: "pool-moh-oh-loh-gee",
  },
  "pulmo-algia": {
    plainLanguage: "Pain in the lungs (Pulmalgia)",
    severity: "high",
    reasoning: "Pain in the lungs can be a symptom of respiratory issues, including infection or trauma.",
    pronunciation: "pool-moh-al-jee-ah",
  },
  "pulmo-genesis": {
    plainLanguage: "Origin of lung conditions (Pulmogenesis)",
    severity: "moderate",
    reasoning: "This term refers to the origin and development of lung diseases.",
    pronunciation: "pool-moh-jeh-neh-sis",
  },
  "pulmo-plasty": {
    plainLanguage: "Surgical repair of the lung (Pulmoplasty)",
    severity: "severe",
    reasoning: "Pulmoplasty involves major surgery to repair lung damage or deformities.",
    pronunciation: "pool-moh-plas-tee",
  },
  "pulmo-sclerosis": {
    plainLanguage: "Hardening of the lung tissue (Pulmosclerosis)",
    severity: "high",
    reasoning: "Hardening of lung tissue can lead to restricted lung function and other severe health issues.",
    pronunciation: "pool-moh-skleh-roh-sis",
  },
  "pulmo-tomy": {
    plainLanguage: "Cutting into the lung (Pulmotomy)",
    severity: "severe",
    reasoning: "This refers to the surgical incision of lung tissue, often for diagnostic purposes.",
    pronunciation: "pool-moh-toh-mee",
  },
  "pulmo-emia": {
    plainLanguage: "Blood condition related to the lungs (Pulmoemia)",
    severity: "high",
    reasoning: "A blood condition impacting lung function, potentially leading to severe complications.",
    pronunciation: "pool-moh-ee-mee-ah",
  },

  // Neuro combinations
  "neuro-itis": {
    plainLanguage: "Inflammation of the nerves (Neuritis)",
    severity: "high",
    reasoning: "Nerve inflammation can cause pain, numbness, and potentially permanent nerve damage.",
    pronunciation: "new-roh-eye-tis",
  },
  "neuro-cyte": {
    plainLanguage: "Nerve cell (Neurocyte)",
    severity: "low",
    reasoning: "Neurocytes are specialized cells that make up nervous tissue.",
    pronunciation: "new-roh-site",
  },
  "neuro-pathy": {
    plainLanguage: "Disease of the nerves (Neuropathy)",
    severity: "high",
    reasoning: "Nerve disease can cause serious sensory and motor function issues.",
    pronunciation: "new-roh-path-ee",
  },
  "neuro-graphy": {
    plainLanguage: "Recording of nerve activity (Neurography)",
    severity: "low",
    reasoning: "A diagnostic procedure used to record nerve signals and activity.",
    pronunciation: "new-roh-graf-ee",
  },
  "neuro-scopy": {
    plainLanguage: "Visual examination of nerves (Neuroscopy)",
    severity: "moderate",
    reasoning: "A method to visually inspect nerve tissue, often for diagnosing nerve-related conditions.",
    pronunciation: "new-roh-skop-ee",
  },
  "neuro-lysis": {
    plainLanguage: "Breaking down of nerve tissue (Neurolisis)",
    severity: "high",
    reasoning: "Neurolisis refers to the breakdown of nerve tissue, often associated with neurological diseases.",
    pronunciation: "new-roh-ly-sis",
  },
  "neuro-phobia": {
    plainLanguage: "Fear of the nerves (Neurophobia)",
    severity: "low",
    reasoning: "Neurophobia refers to an irrational fear related to neurological conditions or disorders.",
    pronunciation: "new-roh-foh-bee-ah",
  },
  "neuro-mania": {
    plainLanguage: "Excessive excitement about nerves (Neuromania)",
    severity: "low",
    reasoning: "A state of obsession or excitement over neurological conditions.",
    pronunciation: "new-roh-may-nee-ah",
  },
  "neuro-plasia": {
    plainLanguage: "Formation of nerve tissue (Neuropasia)",
    severity: "moderate",
    reasoning: "This term refers to the abnormal growth or development of nerve tissue.",
    pronunciation: "new-roh-play-zee-ah",
  },
  "neuro-ectomy": {
    plainLanguage: "Surgical removal of nerve tissue (Neuroectomy)",
    severity: "severe",
    reasoning: "Removal of nerve tissue is often done to treat tumors or severe nerve damage.",
    pronunciation: "new-roh-ek-toh-mee",
  },
  "neuro-ology": {
    plainLanguage: "Study of the nervous system (Neurology)",
    severity: "low",
    reasoning: "Neurology is the medical specialty concerned with the nervous system and its disorders.",
    pronunciation: "new-roh-oh-loh-gee",
  },
  "neuro-algia": {
    plainLanguage: "Pain in the nerves (Neuralgia)",
    severity: "high",
    reasoning: "Nerve pain can be intense and debilitating, often requiring pain management.",
    pronunciation: "new-roh-al-jee-ah",
  },
  "neuro-genesis": {
    plainLanguage: "Origin of nerve conditions (Neurogenesis)",
    severity: "moderate",
    reasoning: "Neurogenesis refers to the creation of new neurons in the nervous system.",
    pronunciation: "new-roh-jeh-neh-sis",
  },
  "neuro-plasty": {
    plainLanguage: "Surgical repair of nerve tissue (Neuroplasty)",
    severity: "severe",
    reasoning: "Surgical repair to restore nerve function or treat nerve damage.",
    pronunciation: "new-roh-plas-tee",
  },
  "neuro-sclerosis": {
    plainLanguage: "Hardening of nerve tissue (Neurosclerosis)",
    severity: "high",
    reasoning: "This refers to the hardening or scarring of nerve tissue, often leading to neurological impairment.",
    pronunciation: "new-roh-skleh-roh-sis",
  },
  "neuro-tomy": {
    plainLanguage: "Cutting into nerve tissue (Neurotomy)",
    severity: "severe",
    reasoning: "A surgical procedure where nerve tissue is severed to relieve pain or treat conditions.",
    pronunciation: "new-roh-toh-mee",
  },
  "neuro-emia": {
    plainLanguage: "Blood condition related to the nervous system (Neuroemia)",
    severity: "high",
    reasoning: "This refers to blood disorders that affect the functioning of the nervous system.",
    pronunciation: "new-roh-ee-mee-ah",
  },

  // Yoshi combo
  "yoshi-itis": {
    plainLanguage: "Inflammation of the Yoshi (yoshiitis)",
    severity: "low",
    reasoning: "You have scared Yoshi. He is now a poofy ball of poof.",
    pronunciation: "yo-shee-eye-tis",
  },
};
