/**
 * Returns any value in the range [from, to]
 */
export function random(from: number, to: number) {
  return from + Math.round(Math.random() * (to - from));
}
