import { DEFAULT_UNCAUGHT_COMMAND_ERROR_RESPONSE } from '../constants';
import { BotCommandResponse, BotCommands, BotConfig } from '../interfaces';
import { countdown } from '../internals';
import { VkGroupEvent, VkReply } from '../vk';

export async function newMessageHandler(
  event: VkGroupEvent<'message_new'>,
  commands: BotCommands,
  reply: VkReply,
  config: BotConfig
): Promise<void> {
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
      break;
    }
  } catch (e) {
    const badCommandResponse = uncaughtCommandErrorResponse
      ? uncaughtCommandErrorResponse
      : DEFAULT_UNCAUGHT_COMMAND_ERROR_RESPONSE;
    await reply(badCommandResponse, event);
  }
}
