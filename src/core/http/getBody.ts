import { IncomingMessage } from 'http';
import { BotServerError } from '../internals';
import {
  JSON_ERROR_RESPONSE,
  METHOD_ERROR_RESPONSE,
  VK_ERROR_RESPONSE,
} from '../server-responses';
import { getJSONBody } from './getJSONBody';

export async function getBody(req: IncomingMessage) {
  if (req.method !== 'POST') {
    throw new BotServerError(METHOD_ERROR_RESPONSE);
  }

  const body = await getJSONBody(req);

  if (!body) {
    throw new BotServerError(JSON_ERROR_RESPONSE);
  }

  if (body.secret !== process.env.SECRET_KEY) {
    throw new BotServerError(VK_ERROR_RESPONSE);
  }

  return body;
}
