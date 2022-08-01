import { BotVerificationError } from '../interfaces';

export const VK_ERROR: BotVerificationError = {
  __type__: 'verification_error',
  status: 403,
  message: 'Not VK Callback API call',
};
