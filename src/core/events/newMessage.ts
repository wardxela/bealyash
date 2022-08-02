import { commands } from '../../commands';
import { COMMAND_ERROR_RESPONSE } from '../command_responses';
import { CommandError } from '../errors';
import { BotConfig } from '../interfaces';
import { VkNewMessageEvent, sendMessage } from '../vk';

export async function newMessage(event: VkNewMessageEvent, config: BotConfig) {
  for (const [pattern, command] of commands) {
    if (!pattern.test(event.object.message.text)) {
      continue;
    }
    try {
      const commandResponse = await command(event);
      return sendMessage(commandResponse, event.object);
    } catch (e) {
      if (e instanceof CommandError) {
        return sendMessage(e.commandResponse, event.object);
      }
      const uncaughtError = config.badResponse
        ? config.badResponse
        : COMMAND_ERROR_RESPONSE;

      return sendMessage(uncaughtError, event.object);
    }
  }
}
