import { createServer } from 'http';
import { Bot, BotConfig, BotServerResponse } from './interfaces';
import { confirmServer, getBody, sendResponse } from './internals';
import { BotServerError } from './errors';
import { createReply, VkEvent } from './vk';
import {
  INTERNAL_SERVER_ERROR_RESPONSE,
  OK_SERVER_RESPONSE,
} from './constants';
import { emitEvent } from './events';
import { createContainer } from './createContainer';

export function createBot(config: BotConfig): Bot {
  const rootContainer = createContainer();

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
      emitEvent(event, rootContainer, reply, config);
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
    rootContainer.set(pattern, command);
  };

  const protect: Bot['protect'] = (pattern, guard) => {
    rootContainer.protect(pattern, guard);
  };

  const group: Bot['group'] = container => {
    rootContainer.group(container);
  };

  const listen: Bot['listen'] = port => {
    return server.listen(port);
  };

  return { set, protect, group, listen };
}
