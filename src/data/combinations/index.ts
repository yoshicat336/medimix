import { CombinationKey, CombinationExplanation } from '../types';
import { pulmoCombinations } from './pulmo';
import { neuroCombinations } from './neuro';
import { cardioCombinations } from './cardio';
import { hepatoCombinations } from './hepato';
import { dermoCombinations } from './dermo';
import { funCombinations } from './fun';

export const combinationExplanations: Record<CombinationKey, CombinationExplanation> = {
  ...pulmoCombinations,
  ...neuroCombinations,
  ...cardioCombinations,
  ...hepatoCombinations,
  ...dermoCombinations,
  ...funCombinations,
};