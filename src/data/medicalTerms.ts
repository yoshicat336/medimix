import { CombinationKey } from './types';
import { combinationExplanations } from './combinations/index';

export * from './types';
export * from './prefixes';
export * from './suffixes';

export const getExplanation = (prefix: string, suffix: string) => {
  const key = `${prefix}-${suffix}` as CombinationKey;
  return combinationExplanations[key];
};