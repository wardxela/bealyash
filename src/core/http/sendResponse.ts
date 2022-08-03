import { ServerResponse } from 'http';
import { BotServerResponse } from '../interfaces';

export function sendResponse(
  res: ServerResponse,
  botResponse: BotServerResponse
) {
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = botResponse.status;
  res.end(botResponse.message);
}
