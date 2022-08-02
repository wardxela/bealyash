import { createServer } from 'http';
import { BotError, getBody, sendResponse } from './internals';
import { eventListener } from './eventListener';
import { SERVER_ERROR_RESPONSE } from './common_responses';

export function createBot() {
  const server = createServer(async (req, res) => {
    try {
      const body = await getBody(req);
      const botResponse = await eventListener(body);
      sendResponse(res, botResponse);
    } catch (e) {
      const botResponse =
        e instanceof BotError ? e.response : SERVER_ERROR_RESPONSE;
      sendResponse(res, botResponse);
    }
  });

  return server;
}
