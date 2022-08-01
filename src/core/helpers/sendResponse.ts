import { ServerResponse } from 'http';
import { BotResponse } from '../interfaces';

export function sendResponse(res: ServerResponse, botResponse: BotResponse) {
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = botResponse.status;
  res.end(botResponse.message);
}
