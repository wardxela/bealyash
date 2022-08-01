import { BotVerificationError } from '../interfaces';

export const METHOD_ERROR: BotVerificationError = {
  __type__: 'verification_error',
  status: 405,
  message: 'Method is unavailable. Use POST instead',
};
