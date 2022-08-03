export function countdown<R>(promise: Promise<R>, ms: number) {
  let timeoutId: NodeJS.Timeout;

  return new Promise<R>((resolve, reject) => {
    promise.then(value => {
      clearTimeout(timeoutId);
      resolve(value);
    });
    timeoutId = setTimeout(reject, ms);
  });
}
