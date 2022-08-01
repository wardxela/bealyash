import { random } from './random';

/**
 * Returns random value `T` from `values`
 */
export function randomFrom<T>(values: T[]) {
  return values[random(0, values.length - 1)];
}
