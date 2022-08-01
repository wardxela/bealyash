import { IncomingMessage } from 'http';
import { BotVerificationError, VkBody } from '../interfaces';
import { JSON_ERROR, METHOD_ERROR, VK_ERROR } from './errors';

export function verifyRequest(
  req: IncomingMessage,
  body: VkBody | null
): BotVerificationError | VkBody {
  if (req.method !== 'POST') {
    return METHOD_ERROR;
  }

  if (!body) {
    return JSON_ERROR;
  }

  if (body.secret !== process.env.SECRET_KEY) {
    return VK_ERROR;
  }

  return body;
}
