import { CombinationKey, CombinationExplanation } from '../types';
import { pulmoCombinations } from './pulmo';
import { neuroCombinations } from './neuro';
import { funCombinations } from './fun';

export const combinationExplanations: Record<CombinationKey, CombinationExplanation> = {
  ...pulmoCombinations,
  ...neuroCombinations,
  ...funCombinations,
};