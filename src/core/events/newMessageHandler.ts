import { DEFAULT_UNCAUGHT_COMMAND_ERROR_RESPONSE } from '../constants';
import { BotConfig, BotContainer } from '../interfaces';
import { verifyCommandResponse, safePromise } from '../internals';
import { VkGroupEvent, VkReply } from '../vk';

// 0 - message is sent
// 1 - message isn't sent
export async function newMessageHandler(
  event: VkGroupEvent<'message_new'>,
  container: BotContainer,
  reply: VkReply,
  config: BotConfig
): Promise<number> {
  const { timeout, uncaughtCommandErrorResponse } = config;
  try {
    for (const nestedContainer of container.containers) {
      const status = await newMessageHandler(
        event,
        nestedContainer,
        reply,
        config
      );
      if (status === 0) {
        return 0;
      }
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
            await reply(guardResponse, event);
            return 0;
          }
        }
      }
      const commandResponse = await safePromise(
        command(event, commandMatch),
        timeout
      );
      if (verifyCommandResponse(commandResponse)) {
        await reply(commandResponse, event);
        return 0;
      }
    }
    return 1;
  } catch (e) {
    const badCommandResponse = uncaughtCommandErrorResponse
      ? uncaughtCommandErrorResponse
      : DEFAULT_UNCAUGHT_COMMAND_ERROR_RESPONSE;
    await reply(badCommandResponse, event);
    return 0;
  }
}
