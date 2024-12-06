import { CombinationKey, CombinationExplanation } from '../types';
import { pulmoCombinations } from './pulmo';
import { neuroCombinations } from './neuro';
import { cardioCombinations } from './cardio';
import { hepatoCombinations } from './hepato';
import { dermoCombinations } from './dermo';
import { osteoCombinations } from './osteo';
import { cranioCombinations } from './cranio';
import { gastroCombinations } from './gastro';
import { necroCombinations } from './necro';
import { cytoCombinations } from './cyto';
import { myoCombinations } from './myo';
import { arthroCombinations } from './arthro';
import { pneumoCombinations } from './pneumo';
import { lipoCombinations } from './lipo';
import { endoCombinations } from './endo';
import { hemoCombinations } from './hemo';
import { psychCombinations } from './psych';
import { thoracoCombinations } from './thoraco';
import { rhinoCombinations } from './rhino';
import { ophtalmoCombinations } from './ophtalmo';
import { funCombinations } from './fun';

export const combinationExplanations: Record<CombinationKey, CombinationExplanation> = {
  ...pulmoCombinations,
  ...neuroCombinations,
  ...cardioCombinations,
  ...hepatoCombinations,
  ...dermoCombinations,
  ...osteoCombinations,
  ...cranioCombinations,
  ...gastroCombinations,
  ...necroCombinations,
  ...cytoCombinations,
  ...myoCombinations,
  ...arthroCombinations,
  ...pneumoCombinations,
  ...lipoCombinations,
  ...endoCombinations,
  ...hemoCombinations,
  ...psychCombinations,
  ...thoracoCombinations,
  ...rhinoCombinations,
  ...ophtalmoCombinations,
  ...funCombinations,
};