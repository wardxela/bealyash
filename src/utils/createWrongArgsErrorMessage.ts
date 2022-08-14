export function createWrongArgsErrorMessage(schema: Record<string, string>) {
  let neededArgs = '';

  for (const key in schema) {
    neededArgs = `${neededArgs}${key} (${schema[key]})\n`;
  }

  return `Параметры неверные.\nНеобходимо передать:\n${neededArgs}`;
}
