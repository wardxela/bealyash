import { random } from './random';

/**
 * Returns random value `T` from `values`
 */
export function randomFrom<T>(values: readonly T[]) {
  return values[random(0, values.length - 1)];
}
