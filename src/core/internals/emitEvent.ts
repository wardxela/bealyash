import { BotCommands, BotConfig, BotServerResponse } from '../interfaces';
import { VkEvent, VkReply } from '../vk';
import { confirmationHandler, newMessageHandler } from '../events';
import { OK_SERVER_RESPONSE } from '../constants';

export async function emitEvent(
  event: VkEvent,
  commands: BotCommands,
  reply: VkReply,
  config: BotConfig
): Promise<BotServerResponse> {
  switch (event.type) {
    case 'confirmation':
      return confirmationHandler(config.confirmationString);
    case 'message_new':
      return newMessageHandler(event, commands, reply, config);
    default:
      return OK_SERVER_RESPONSE;
  }
}
