import { BotVerificationError } from '../interfaces';

export function isVerifyingError(error: any): error is BotVerificationError {
  return '__type__' in error && error.__type__ === 'verification_error';
}
