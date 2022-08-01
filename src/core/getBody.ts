import { IncomingMessage } from 'http';
import { VkBody } from '../vk';

export async function getBody(req: IncomingMessage): Promise<VkBody | null> {
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
