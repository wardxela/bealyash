import { BotResponse } from '../../interfaces';

export function auth(): BotResponse {
  return {
    status: 200,
    message: process.env.CONFIRMATION_STRING!,
  };
}
