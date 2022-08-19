import { randomInt } from './randomInt';

/**
 * Returns random value `T` from `values`
 */
export function randomFrom<T>(values: readonly T[]) {
  return values[randomInt(0, values.length - 1)];
}
