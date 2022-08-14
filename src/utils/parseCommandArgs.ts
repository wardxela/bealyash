export function parseCommandArgs(text: string) {
  const keyValueRegExp = /([_a-zA-Zа-яА-Я]+):\s?([-\s\wа-яА-Я\.]+)(\n|$)/g;
  const map: Record<string, string> = {};
  for (const arr of text.matchAll(keyValueRegExp)) {
    map[arr[1]] = arr[2];
  }
  return map;
}
