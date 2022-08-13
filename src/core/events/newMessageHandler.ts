import { DEFAULT_UNCAUGHT_COMMAND_ERROR_RESPONSE } from '../constants';
import { BotConfig, BotContainer } from '../interfaces';
import { verifyCommandResponse, safePromise } from '../internals';
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
      for (const [pattern2, guard] of container.guards) {
        const match2 = event.object.message.text.match(pattern2);
        if (!match2) {
          continue;
        }
        const guardResponse = await safePromise(guard(event, match2), timeout);
        if (!guardResponse.success) {
          if (verifyCommandResponse(guardResponse)) {
            return reply(guardResponse, event);
          }
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
