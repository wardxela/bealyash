import {
  DEFAULT_UNCAUGHT_COMMAND_ERROR_RESPONSE,
  OK_SERVER_RESPONSE,
} from '../constants';
import { BotServerError } from '../errors';
import { BotCommandResponse, BotCommands, BotConfig } from '../interfaces';
import { countdown } from '../internals';
import { VkNewMessageEvent, VkReply } from '../vk';

export async function newMessageHandler(
  event: VkNewMessageEvent,
  commands: BotCommands,
  reply: VkReply,
  config: BotConfig
) {
  const { timeout, uncaughtCommandErrorResponse } = config;

  try {
    for (const [pattern, command] of commands) {
      if (!pattern.test(event.object.message.text)) {
        continue;
      }
      const commandPromiseOrResponse = command(event);
      let commandResponse: BotCommandResponse;
      if (commandPromiseOrResponse instanceof Promise) {
        commandResponse = await countdown(commandPromiseOrResponse, timeout);
      } else {
        commandResponse = commandPromiseOrResponse;
      }
      if (commandResponse !== null) {
        await reply(commandResponse, event);
      }
    }
  } catch (e) {
    if (e instanceof BotServerError) {
      throw e;
    }
    const badCommandResponse = uncaughtCommandErrorResponse
      ? uncaughtCommandErrorResponse
      : DEFAULT_UNCAUGHT_COMMAND_ERROR_RESPONSE;
    await reply(badCommandResponse, event);
  }

  return OK_SERVER_RESPONSE;
}
