import { DEFAULT_SERVER_TIMEOUT } from '../constants';

/**
 * Rejects if given promise doesn't resolve in specified time
 * @param promise Promise to wait
 * @param ms Time to wait promise
 * @param message Message to send in case of timeout error
 * @returns Promise
 */
export function countdown<R>(promise: Promise<R>, ms?: number) {
  let timeoutId: NodeJS.Timeout;
  const time = ms ? ms : DEFAULT_SERVER_TIMEOUT;

  return new Promise<R>((resolve, reject) => {
    promise.then(
      value => {
        clearTimeout(timeoutId);
        resolve(value);
      },
      reason => {
        clearTimeout(timeoutId);
        reject(reason);
      }
    );
    timeoutId = setTimeout(() => {
      reject(new Error());
    }, time);
  });
}

/**
 * Wrapper over `countdown` function. Makes sure that
 * the server doesn't wait for too long to get a fulfilled response
 * from a Promise.
 *
 * The difference between core `countdown` function is that you
 * can pass any value, not only promises.
 * @param value Promise or anything
 * @param timeout time which the server will take to wait for promise
 * @returns Promise with fulfilled value
 */
export async function safePromise<T>(
  value: Promise<T> | T,
  timeout?: number
): Promise<T> {
  if (!(value instanceof Promise)) {
    return value;
  }

  return countdown(value, timeout);
}
