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
    for (const [commandPattern, command] of container.commands) {
      const commandMatch = event.object.message.text.match(commandPattern);
      if (!commandMatch) {
        continue;
      }
      for (const [guardPattern, guard] of container.guards) {
        const guardMatch = event.object.message.text.match(guardPattern);
        if (!guardMatch) {
          continue;
        }
        const guardResponse = await safePromise(
          guard(event, guardMatch),
          timeout
        );
        if (!guardResponse.success) {
          if (verifyCommandResponse(guardResponse)) {
            return reply(guardResponse, event);
          }
        }
      }
      const commandResponse = await safePromise(
        command(event, commandMatch),
        timeout
      );
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
