import { IncomingMessage } from 'http';
import { BotVerificationError } from '../interfaces';
import { VkBody } from '../vk';
import { JSON_ERROR, VK_ERROR } from './errors';
import { isValidSecretKey } from './validators';

export function verifyRequest(
  req: IncomingMessage,
  body: VkBody | null
): BotVerificationError | VkBody {
  if (!body) {
    return JSON_ERROR;
  }

  if (!isValidSecretKey(body.secret)) {
    return VK_ERROR;
  }

  return body;
}
