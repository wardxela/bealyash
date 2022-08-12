import { BotCommands, BotConfig, BotGuards } from '../interfaces';
import { VkEvent, VkReply } from '../vk';
import { newMessageHandler } from '../events';

export async function emitEvent(
  event: VkEvent,
  commands: BotCommands,
  guards: BotGuards,
  reply: VkReply,
  config: BotConfig
): Promise<void> {
  try {
    if (event.type === 'message_new') {
      await newMessageHandler(event, commands, guards, reply, config);
      console.log('[server] success');
    }
  } catch (e) {
    console.error('[server] error');
  }
}
