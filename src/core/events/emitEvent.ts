import { BotConfig, BotContainer } from '../interfaces';
import { VkEvent, VkReply } from '../vk';
import { newMessageHandler } from './newMessageHandler';

export async function emitEvent(
  event: VkEvent,
  container: BotContainer,
  reply: VkReply,
  config: BotConfig
): Promise<void> {
  try {
    if (event.type === 'message_new') {
      await newMessageHandler(event, container, reply, config);
    }
  } catch (e) {
    console.error('Internal server error');
  }
}
