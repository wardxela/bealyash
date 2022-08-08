import { BotServerResponse } from '../interfaces';

export function confirmServer(confirmationString: string): BotServerResponse {
  return {
    status: 200,
    message: confirmationString,
  };
}
