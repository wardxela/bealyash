import { CONFIRMATION_RESPONSE, OK_RESPONSE } from '../server-responses';
import { BotCommands, BotConfig, BotServerResponse } from '../interfaces';
import { VkEvent } from '../vk';
import { newMessageHandler } from '../events';

export async function eventListener(
  event: VkEvent,
  commands: BotCommands,
  config: BotConfig
): Promise<BotServerResponse> {
  switch (event.type) {
    case 'confirmation':
      return CONFIRMATION_RESPONSE;
    case 'message_new':
      await newMessageHandler(event, commands, config);
  }

  return OK_RESPONSE;
}
