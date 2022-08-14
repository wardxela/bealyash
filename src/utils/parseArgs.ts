import { z } from 'zod';
import { safeParseArgs } from './safeParseArgs';

export function parseArgs<T extends z.ZodRawShape>(
  text: string,
  schema: z.ZodObject<T>
) {
  const notSafeArgs = safeParseArgs(text);
  return schema.parse(notSafeArgs);
}
