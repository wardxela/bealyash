import { createServer } from 'http';
import {
  Bot,
  BotConfig,
  BotCommand,
  BotCommands,
  BotServerResponse,
  BotGuards,
  BotGuard,
} from './interfaces';
import { confirmServer, emitEvent, getBody, sendResponse } from './internals';
import { BotServerError } from './errors';
import { createReply, VkEvent } from './vk';
import {
  INTERNAL_SERVER_ERROR_RESPONSE,
  OK_SERVER_RESPONSE,
} from './constants';

export function createBot(config: BotConfig): Bot {
  const commands: BotCommands = new Map();
  const guards: BotGuards = new Map();

  const reply = createReply({
    accessToken: config.serverVkApiAccessToken,
    apiVersion: config.vkApiVersion,
  });

  const server = createServer(async (req, res) => {
    try {
      // TODO: Validate request. Type `any` is pretty bad.
      const event = (await getBody(req)) as VkEvent;
      let response: BotServerResponse;
      if (event.type === 'confirmation') {
        response = confirmServer(config.confirmationString);
      } else {
        response = OK_SERVER_RESPONSE;
      }
      emitEvent(event, commands, guards, reply, config);
      sendResponse(res, response);
    } catch (e) {
      let badBotServerResponse: BotServerResponse;
      if (e instanceof BotServerError) {
        badBotServerResponse = e.serverResponse;
      } else {
        badBotServerResponse = INTERNAL_SERVER_ERROR_RESPONSE;
      }
      sendResponse(res, badBotServerResponse);
    }
  });

  const set: Bot['set'] = (pattern, command) => {
    commands.set(pattern, command);
  };

  const protect: Bot['protect'] = (pattern, guard) => {
    guards.set(pattern, guard);
  };

  const listen: Bot['listen'] = port => {
    return server.listen(port);
  };

  return { set, protect, listen };
}
