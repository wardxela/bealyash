import { BotServerResponse } from '../interfaces';

export function confirmationHandler(
  confirmationString: string
): BotServerResponse {
  return {
    status: 200,
    message: confirmationString,
  };
}
