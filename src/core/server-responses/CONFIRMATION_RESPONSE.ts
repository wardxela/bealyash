import { BotServerResponse } from '../interfaces';

export const CONFIRMATION_RESPONSE: BotServerResponse = {
  status: 200,
  message: process.env.CONFIRMATION_STRING || '',
};
