import { CombinationKey, CombinationExplanation } from './types';
import { combinationExplanations } from './combinations';

export * from './types';
export * from './prefixes';
export * from './suffixes';
export * from './combinations';

export const getExplanation = (prefix: string, suffix: string) => {
  const key = `${prefix}-${suffix}` as CombinationKey;
  return combinationExplanations[key];
};