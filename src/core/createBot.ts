import { createServer } from 'http';
import { Bot, BotConfig, BotCommand, BotCommands } from './interfaces';
import { emitEvent, getBody, sendResponse } from './internals';
import { BotServerError } from './errors';
import { createReply } from './vk';
import { INTERNAL_SERVER_ERROR_RESPONSE } from './constants';

export function createBot(config: BotConfig): Bot {
  const commands: BotCommands = new Map();
  const reply = createReply({
    accessToken: config.serverVkApiAccessToken,
    apiVersion: config.vkApiVersion,
  });

  const server = createServer(async (req, res) => {
    try {
      // TODO: Validate request. Type `any` is pretty bad.
      const event = await getBody(req);
      const botServerResponse = await emitEvent(event, commands, reply, config);
      sendResponse(res, botServerResponse);
    } catch (e) {
      const badBotServerResponse =
        e instanceof BotServerError
          ? e.serverResponse
          : INTERNAL_SERVER_ERROR_RESPONSE;
      sendResponse(res, badBotServerResponse);
    }
  });

  const set = (pattern: RegExp, command: BotCommand) => {
    commands.set(pattern, command);
  };

  const listen = (port: number) => {
    return server.listen(port);
  };

  return { set, listen };
}
