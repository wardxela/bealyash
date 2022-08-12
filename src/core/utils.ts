import { Pattern } from './interfaces';

export function doMatch(pattern: Pattern, text: string) {
  return typeof pattern === 'string' ? pattern === text : pattern.test(text);
}
