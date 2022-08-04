import { IncomingMessage } from 'http';
import { BotServerJsonError } from '../errors';

export async function getJSONBody(req: IncomingMessage): Promise<any> {
  let body = '';

  for await (const chunk of req) {
    body += chunk;
  }

  try {
    return JSON.parse(body);
  } catch (error) {
    throw new BotServerJsonError();
  }
}
