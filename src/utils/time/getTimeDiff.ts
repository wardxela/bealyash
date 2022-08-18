export function getTimeDiff(date: Date): number {
  return new Date().getTime() - date.getTime();
}
