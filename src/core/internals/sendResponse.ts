import { ServerResponse } from 'http';
import { BotServerResponse } from '../interfaces';

export function sendResponse(
  res: ServerResponse,
  botResponse: BotServerResponse
) {
  const { status, message, headers } = botResponse;

  res.setHeader('Content-Type', 'text/plain');

  if (headers) {
    for (const [name, value] of headers) {
      res.setHeader(name, value);
    }
  }

  res.statusCode = status;
  res.end(message);
}
