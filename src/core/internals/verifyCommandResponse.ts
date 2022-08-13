import { BotCommandResponse } from '../interfaces';
import { BotVerifiedCommandResponse } from '../interfaces';

export function verifyCommandResponse(
  response: Partial<BotCommandResponse>
): response is BotVerifiedCommandResponse {
  if (response === null) {
    return false;
  }

  if (!response.message && !response.attachment) {
    return false;
  }

  return true;
}
