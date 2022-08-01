import { BotResponse } from './BotResponse';

export interface BotVerificationError extends BotResponse {
  __type__: 'verification_error';
}
