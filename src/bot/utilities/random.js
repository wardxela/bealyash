export function anyElement(array) {
  if (array.length === 0) {
    return null;
  }

  const index = anyNumber(0, array.length - 1);

  return array[index];
}

export function anyNumber(from, to) {
  return from + Math.round(Math.random() * (to - from));
}
