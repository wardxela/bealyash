import { BotCommandResponse, BotCommands, BotConfig } from '../interfaces';
import { countdown } from '../internals';
import { OK_RESPONSE } from '../server-responses';
import { VkNewMessageEvent, VkSendMessage } from '../vk';

export async function newMessageHandler(
  event: VkNewMessageEvent,
  commands: BotCommands,
  vkSendMessage: VkSendMessage,
  config: BotConfig
) {
  try {
    for (const [pattern, command] of commands) {
      if (!pattern.test(event.object.message.text)) {
        continue;
      }
      const commandPromise = command(event);
      let commandResponse: BotCommandResponse;

      if (commandPromise instanceof Promise) {
        commandResponse = await countdown(commandPromise, 7000);
      } else {
        commandResponse = commandPromise;
      }

      if (commandResponse !== null) {
        await vkSendMessage(commandResponse, event);
      }
    }
  } catch (e) {
    const badCommandResponse = config.uncaughtErrorResponse
      ? config.uncaughtErrorResponse
      : { message: 'error' };

    await vkSendMessage(badCommandResponse, event);
  }
  return OK_RESPONSE;
}
