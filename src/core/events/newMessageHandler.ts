import { DEFAULT_UNCAUGHT_COMMAND_ERROR_RESPONSE } from '../constants';
import { BotCommands, BotConfig, BotGuards } from '../interfaces';
import { verifyCommandResponse, safePromise } from '../internals';
import { doMatch } from '../utils';
import { VkGroupEvent, VkReply } from '../vk';

export async function newMessageHandler(
  event: VkGroupEvent<'message_new'>,
  commands: BotCommands,
  guards: BotGuards,
  reply: VkReply,
  config: BotConfig
): Promise<void> {
  const { timeout, uncaughtCommandErrorResponse } = config;
  try {
    for (const [pattern, guard] of guards) {
      if (!doMatch(pattern, event.object.message.text)) {
        continue;
      }
      const success = await safePromise(guard(event), timeout);
      if (!success) {
        console.log('[guard] fail');
        return;
      }
    }
    console.log('[guard] success');
    for (const [pattern, command] of commands) {
      if (!doMatch(pattern, event.object.message.text)) {
        continue;
      }
      const commandResponse = await safePromise(command(event), timeout);
      if (verifyCommandResponse(commandResponse)) {
        await reply(commandResponse, event);
      }
      console.log('[command] success');
      break;
    }
  } catch (e) {
    console.log('[command] fail');
    const badCommandResponse = uncaughtCommandErrorResponse
      ? uncaughtCommandErrorResponse
      : DEFAULT_UNCAUGHT_COMMAND_ERROR_RESPONSE;
    await reply(badCommandResponse, event);
  }
}
