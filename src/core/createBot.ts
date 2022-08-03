import { createServer } from 'http';
import { getBody, sendResponse } from './http';
import { INTERNAL_SERVER_ERROR_RESPONSE } from './server-responses';
import { Bot, BotConfig, BotCommand, BotCommands } from './interfaces';
import { BotServerError, eventListener } from './internals';
import { createSendMessage } from './vk';

export function createBot(config: BotConfig): Bot {
  const commands: BotCommands = new Map();
  const vkSendMessage = createSendMessage({
    accessToken: config.serverVkApiAccessToken,
    apiVersion: config.vkApiVersion,
  });

  const server = createServer(async (req, res) => {
    try {
      // TODO: Validate request. Type `any` is pretty bad.
      const body = await getBody(req);
      const botServerResponse = await eventListener(
        body,
        commands,
        vkSendMessage,
        config
      );
      sendResponse(res, botServerResponse);
    } catch (e) {
      const badBotServerResponse =
        e instanceof BotServerError
          ? e.serverResponse
          : INTERNAL_SERVER_ERROR_RESPONSE;
      sendResponse(res, badBotServerResponse);
    }
  });

  function add(pattern: RegExp, command: BotCommand) {
    commands.set(pattern, command);
  }

  const listen = (port: number) => {
    return server.listen(port);
  };

  return { add, listen };
}
