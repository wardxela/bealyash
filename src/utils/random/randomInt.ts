/**
 * Returns any value in the range [from, to]
 */
export function randomInt(from: number, to: number) {
  return from + Math.floor(Math.random() * (to - from + 1));
}
