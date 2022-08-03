import { OK_RESPONSE } from '../server-responses';
import { BotCommands, BotConfig, BotServerResponse } from '../interfaces';
import { VkEvent, VkSendMessage } from '../vk';
import { newMessageHandler } from '../events';

export async function eventListener(
  event: VkEvent,
  commands: BotCommands,
  vkSendMessage: VkSendMessage,
  config: BotConfig
): Promise<BotServerResponse> {
  switch (event.type) {
    case 'confirmation':
      return {
        status: 200,
        message: config.confirmationString,
      };
    case 'message_new':
      await newMessageHandler(event, commands, vkSendMessage, config);
  }

  return OK_RESPONSE;
}
