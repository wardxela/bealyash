import { BotServerError } from './BotServerError';

export class BotServerWrongMethodError extends BotServerError {
  constructor(message?: string) {
    super({
      status: 405,
      message: message ? message : 'Method is unavailable. Use POST instead',
    });
  }
}
