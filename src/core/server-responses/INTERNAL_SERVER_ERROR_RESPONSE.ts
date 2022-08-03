import { BotServerResponse } from '../interfaces';

export const INTERNAL_SERVER_ERROR_RESPONSE: BotServerResponse = {
  status: 500,
  message: 'Internal server error',
};
