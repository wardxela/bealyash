import { DEFAULT_UNCAUGHT_COMMAND_ERROR_RESPONSE } from '../constants';
import { BotConfig, BotContainer } from '../interfaces';
import { verifyCommandResponse, safePromise } from '../internals';
import { doMatch } from '../utils';
import { VkGroupEvent, VkReply } from '../vk';

export async function newMessageHandler(
  event: VkGroupEvent<'message_new'>,
  container: BotContainer,
  reply: VkReply,
  config: BotConfig
): Promise<void> {
  const { timeout, uncaughtCommandErrorResponse } = config;
  try {
    for (const nestedContainer of container.containers) {
      await newMessageHandler(event, nestedContainer, reply, config);
    }
    for (const [pattern, command] of container.commands) {
      const match = event.object.message.text.match(pattern);
      if (!match) {
        continue;
      }
      for (const [pattern, guard] of container.guards) {
        if (!doMatch(pattern, event.object.message.text)) {
          continue;
        }
        const success = await safePromise(guard(event), timeout);
        if (!success) {
          return;
        }
      }
      const commandResponse = await safePromise(command(event, match), timeout);
      if (verifyCommandResponse(commandResponse)) {
        return reply(commandResponse, event);
      }
    }
  } catch (e) {
    const badCommandResponse = uncaughtCommandErrorResponse
      ? uncaughtCommandErrorResponse
      : DEFAULT_UNCAUGHT_COMMAND_ERROR_RESPONSE;
    return reply(badCommandResponse, event);
  }
}
