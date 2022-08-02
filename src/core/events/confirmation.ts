import { BotResponse } from '../interfaces';

export function confirmation(): BotResponse {
  return {
    status: 200,
    message: process.env.CONFIRMATION_STRING!,
  };
}
