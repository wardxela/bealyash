import { BotServerResponse } from '../interfaces';

export const METHOD_ERROR_RESPONSE: BotServerResponse = {
  status: 405,
  message: 'Method is unavailable. Use POST instead',
};
