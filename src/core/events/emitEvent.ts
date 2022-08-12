import clc from 'cli-color';
import { BotCommands, BotConfig, BotGuards } from '../interfaces';
import { VkEvent, VkReply } from '../vk';
import { newMessageHandler } from './newMessageHandler';

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
      console.log(clc.green('[success] event handler did job'));
    }
  } catch (e) {
    console.error(clc.red('[error] event handler failed'));
  }
}
