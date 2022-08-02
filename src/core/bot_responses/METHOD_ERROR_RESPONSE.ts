import { BotResponse } from '../interfaces';

export const METHOD_ERROR_RESPONSE: BotResponse = {
  status: 405,
  message: 'Method is unavailable. Use POST instead',
};
