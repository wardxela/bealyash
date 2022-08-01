import { BotVerificationError } from '../../interfaces';

export function isError(error: any): error is BotVerificationError {
  return '__type__' in error && error.__type__ === 'verification_error';
}
