import { BotCommands, BotConfig } from '../interfaces';
import { VkNewMessageEvent, VkSendMessage } from '../vk';

export async function newMessageHandler(
  event: VkNewMessageEvent,
  commands: BotCommands,
  vkSendMessage: VkSendMessage,
  config: BotConfig
) {
  for (const [pattern, command] of commands) {
    if (!pattern.test(event.object.message.text)) {
      continue;
    }
    try {
      const commandResponse = await command(event);
      return vkSendMessage(commandResponse, event);
    } catch (e) {
      const uncaughtError = config.badCommandResponse
        ? config.badCommandResponse
        : { message: 'error' };

      return vkSendMessage(uncaughtError, event);
    }
  }
}
