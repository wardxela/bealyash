import { random } from './random';

export function randomFrom<T>(values: T[]) {
  return values[random(0, values.length - 1)];
}
