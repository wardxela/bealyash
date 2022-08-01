import { BotVerificationError } from '../../interfaces';

export const JSON_ERROR: BotVerificationError = {
  __type__: 'verification_error',
  status: 400,
  message: 'Request body is not JSON',
};
