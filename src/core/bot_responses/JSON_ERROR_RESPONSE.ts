import { BotResponse } from '../interfaces';

export const JSON_ERROR_RESPONSE: BotResponse = {
  status: 400,
  message: 'Request body is not JSON',
};
