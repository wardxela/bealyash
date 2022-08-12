import { BotCommandResponse } from '../interfaces';
import { BotVerifiedCommandResponse } from '../interfaces';

export function verifyCommandResponse(
  response: BotCommandResponse
): response is BotVerifiedCommandResponse {
  if (response === null) {
    return false;
  }
  return true;
}
