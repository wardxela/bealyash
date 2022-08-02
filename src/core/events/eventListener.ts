import { BotResponse } from '../interfaces';
import { VkEvent } from '../vk';
import { confirmation } from './confirmation';
import { newMessage } from './newMessage';

export async function eventListener(event: VkEvent): Promise<BotResponse> {
  switch (event.type) {
    case 'confirmation':
      return confirmation();
    case 'message_new':
      await newMessage(event);
  }

  return {
    status: 200,
    message: 'ok',
  };
}
