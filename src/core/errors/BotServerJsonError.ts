import { BotServerError } from './BotServerError';

export class BotServerJsonError extends BotServerError {
  constructor(message?: string) {
    super({
      status: 400,
      message: message ? message : 'Request body is not JSON',
    });
  }
}
