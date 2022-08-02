import { BotResponse } from '../interfaces';

export const CONFIRMATION_RESPONSE: BotResponse = {
  status: 200,
  message: process.env.CONFIRMATION_STRING || '',
};
