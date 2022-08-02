import { IncomingMessage } from 'http';
import {
  JSON_ERROR_RESPONSE,
  METHOD_ERROR_RESPONSE,
  VK_ERROR_RESPONSE,
} from '../common_responses';
import { BotError } from './BotError';
import { getJSONBody } from './getJSONBody';

export async function getBody(req: IncomingMessage) {
  if (req.method !== 'POST') {
    throw new BotError(METHOD_ERROR_RESPONSE);
  }

  const body = await getJSONBody(req);

  if (!body) {
    throw new BotError(JSON_ERROR_RESPONSE);
  }

  if (body.secret !== process.env.SECRET_KEY) {
    throw new BotError(VK_ERROR_RESPONSE);
  }

  return body;
}
