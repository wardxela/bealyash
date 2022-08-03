import { BotCommands, BotConfig } from '../interfaces';
import { OK_RESPONSE } from '../server-responses';
import { VkNewMessageEvent, VkSendMessage } from '../vk';

export async function newMessageHandler(
  event: VkNewMessageEvent,
  commands: BotCommands,
  vkSendMessage: VkSendMessage,
  config: BotConfig
) {
  try {
    for (const [pattern, command] of commands) {
      if (!pattern.test(event.object.message.text)) {
        continue;
      }
      const commandResponse = await command(event);
      await vkSendMessage(commandResponse, event);
    }
  } catch (e) {
    const badCommandResponse = config.badCommandResponse
      ? config.badCommandResponse
      : { message: 'error' };

    await vkSendMessage(badCommandResponse, event);
  }
  return OK_RESPONSE;
}
