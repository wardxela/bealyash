import { IncomingMessage } from 'http';

export async function getBody(req: IncomingMessage): Promise<any | null> {
  let body = '';

  for await (const chunk of req) {
    body += chunk;
  }

  if (body === '') {
    return null;
  }

  try {
    return JSON.parse(body);
  } catch (error) {
    return null;
  }
}
