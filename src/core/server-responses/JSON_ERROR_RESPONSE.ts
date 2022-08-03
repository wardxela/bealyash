import { BotServerResponse } from '../interfaces';

export const JSON_ERROR_RESPONSE: BotServerResponse = {
  status: 400,
  message: 'Request body is not JSON',
};
