import { BotServerError } from './BotServerError';

export class BotServerTimeoutError extends BotServerError {
  constructor(message?: string) {
    super({
      status: 408,
      message: message ? message : 'Sever timeout error',
      headers: new Map([['Connection', 'close']]),
    });
  }
}
