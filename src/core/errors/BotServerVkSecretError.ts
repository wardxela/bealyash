import { BotServerError } from './BotServerError';

export class BotServerVkSecretError extends BotServerError {
  constructor(message?: string) {
    super({
      status: 403,
      message: message ? message : 'Not VK Callback API call',
    });
  }
}
