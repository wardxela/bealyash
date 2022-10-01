export function randomInt(from: number, to: number) {
  return from + Math.floor(Math.random() * (to - from + 1));
}

export function randomFloat(from: number, to: number) {
  return Math.random() * (to - from) + from;
}

export function randomFrom<T>(values: readonly T[]) {
  return values[randomInt(0, values.length - 1)];
}

export function randomRange(total: number, length: number): [number, number] {
  let offset = randomInt(0, total - 1);
  const tail = length + offset - total;
  if (tail > 0) {
    offset -= tail;
  }
  if (offset < 0) {
    length += offset;
    offset = 0;
  }
  return [offset, length];
}
