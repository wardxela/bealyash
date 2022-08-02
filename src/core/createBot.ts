import { createServer } from 'http';
import { getBody, sendResponse } from './http';
import { eventListener } from './events';
import { SERVER_ERROR_RESPONSE } from './bot_responses';
import { BotConfig } from './interfaces';
import { BotError } from './errors';

export function createBot(config: BotConfig) {
  const server = createServer(async (req, res) => {
    try {
      // TODO: Validate request. Type `any` is pretty bad.
      const body = await getBody(req);
      const botResponse = await eventListener(body, config);
      sendResponse(res, botResponse);
    } catch (e) {
      const badBotResponse =
        e instanceof BotError ? e.botResponse : SERVER_ERROR_RESPONSE;
      sendResponse(res, badBotResponse);
    }
  });

  return server;
}
