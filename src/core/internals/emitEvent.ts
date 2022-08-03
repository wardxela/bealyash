import { OK_RESPONSE } from '../server-responses';
import { BotCommands, BotConfig, BotServerResponse } from '../interfaces';
import { VkEvent, VkSendMessage } from '../vk';
import { confirmationHandler, newMessageHandler } from '../events';

export async function emitEvent(
  event: VkEvent,
  commands: BotCommands,
  vkSendMessage: VkSendMessage,
  config: BotConfig
): Promise<BotServerResponse> {
  switch (event.type) {
    case 'confirmation':
      return confirmationHandler(config.confirmationString);
    case 'message_new':
      return newMessageHandler(event, commands, vkSendMessage, config);
    default:
      return OK_RESPONSE;
  }
}
