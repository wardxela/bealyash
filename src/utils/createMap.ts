export function createMap<T, K extends keyof T>(array: T[], uniqueKey: K) {
  return array.reduce<Record<string | number, T | undefined>>((map, el) => {
    if (!['string', 'number'].includes(typeof el[uniqueKey])) {
      throw new Error(
        `Key ${String(
          uniqueKey
        )} cannot be used as a unique key since it stores value with type other than (string | number)`
      );
    }
    map[el[uniqueKey] as any] = el;
    return map;
  }, {});
}
