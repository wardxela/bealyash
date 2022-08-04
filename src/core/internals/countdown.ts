import { DEFAULT_SERVER_TIMEOUT } from '../constants';
import { BotServerTimeoutError } from '../errors';

/**
 * Rejects if given promise don't resolve in specified time
 * @param promise Promise to wait
 * @param ms Time to wait promise
 * @param message Message to send in case of timeout error
 * @returns Promise
 */
export function countdown<R>(
  promise: Promise<R>,
  ms?: number,
  message?: string
) {
  let timeoutId: NodeJS.Timeout;
  const time = ms ? ms : DEFAULT_SERVER_TIMEOUT;

  return new Promise<R>((resolve, reject) => {
    promise.then(value => {
      clearTimeout(timeoutId);
      resolve(value);
    });
    timeoutId = setTimeout(() => {
      reject(new BotServerTimeoutError(message));
    }, time);
  });
}
