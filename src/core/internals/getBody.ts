import { IncomingMessage } from 'http';
import { BotServerVkSecretError, BotServerWrongMethodError } from '../errors';
import { getJSONBody } from './getJSONBody';

export async function getBody(req: IncomingMessage) {
  if (req.method !== 'POST') {
    throw new BotServerWrongMethodError();
  }

  const body = await getJSONBody(req);

  if (body.secret !== process.env.SECRET_KEY) {
    throw new BotServerVkSecretError();
  }

  return body;
}
