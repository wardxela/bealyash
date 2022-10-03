export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export function getTimeDiff(date: Date): number {
  return new Date().getTime() - date.getTime();
}

export function timeToString(ms: number): string {
  let quotient: number;
  let remainder: number;

  if (ms >= DAY) {
    quotient = Math.floor(ms / DAY);
    remainder = ms % DAY;
    return `${quotient} дн.${
      remainder >= HOUR ? ` ${timeToString(remainder)}` : ''
    }`;
  }
  if (ms >= HOUR) {
    quotient = Math.floor(ms / HOUR);
    remainder = ms % HOUR;
    return `${quotient} ч.${
      remainder >= MINUTE ? ` ${timeToString(remainder)}` : ''
    }`;
  }
  if (ms >= MINUTE) {
    quotient = Math.floor(ms / MINUTE);
    remainder = ms % MINUTE;
    return `${quotient} мин.${
      remainder >= SECOND ? ` ${timeToString(remainder)}` : ''
    }`;
  }
  quotient = Math.floor(ms / SECOND);
  return `${quotient} сек.`;
}
