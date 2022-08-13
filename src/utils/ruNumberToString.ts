export function ruNumberToString(n: number) {
  const russianException =
    ![12, 13, 14].includes(n) && [2, 3, 4].includes(n % 10);

  return `${n} ${russianException ? 'раза' : 'раз'}`;
}
