import { COMMAND_ERROR_RESPONSE } from '../command-responses';
import { BotCommands, BotConfig } from '../interfaces';
import { VkNewMessageEvent, sendMessage } from '../vk';

export async function newMessageHandler(
  event: VkNewMessageEvent,
  commands: BotCommands,
  config: BotConfig
) {
  for (const [pattern, command] of commands) {
    if (!pattern.test(event.object.message.text)) {
      continue;
    }
    try {
      const commandResponse = await command(event);
      return sendMessage(commandResponse, event.object);
    } catch (e) {
      const uncaughtError = config.badCommandResponse
        ? config.badCommandResponse
        : COMMAND_ERROR_RESPONSE;

      return sendMessage(uncaughtError, event.object);
    }
  }
}
