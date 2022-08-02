import { CONFIRMATION_RESPONSE, OK_RESPONSE } from '../bot_responses';
import { BotConfig, BotResponse } from '../interfaces';
import { VkEvent } from '../vk';
import { newMessage } from './newMessage';

export async function eventListener(
  event: VkEvent,
  config: BotConfig
): Promise<BotResponse> {
  switch (event.type) {
    case 'confirmation':
      return CONFIRMATION_RESPONSE;
    case 'message_new':
      await newMessage(event, config);
  }

  return OK_RESPONSE;
}
