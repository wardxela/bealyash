import { DAY, HOUR, MINUTE, SECOND } from './constants';

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
