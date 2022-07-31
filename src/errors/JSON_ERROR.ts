import { BotResponse } from '../interfaces';

export const JSON_ERROR: BotResponse = {
  status: 400,
  message: 'Request body is not JSON',
};
