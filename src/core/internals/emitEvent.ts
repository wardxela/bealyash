import { BotCommands, BotConfig } from '../interfaces';
import { VkEvent, VkReply } from '../vk';
import { newMessageHandler } from '../events';

export async function emitEvent(
  event: VkEvent,
  commands: BotCommands,
  reply: VkReply,
  config: BotConfig
): Promise<void> {
  try {
    if (event.type === 'message_new') {
      await newMessageHandler(event, commands, reply, config);
      console.log('success');
    }
  } catch (e) {
    console.error('error');
  }
}
