import clc from 'cli-color';
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
    for (const [pattern, guard] of container.guards) {
      if (!doMatch(pattern, event.object.message.text)) {
        continue;
      }
      const success = await safePromise(guard(event), timeout);
      if (!success) {
        console.log(clc.red("[error] one of the guards didn't pass"));
        return;
      }
    }
    console.log(clc.green('[success] all guards passed'));
    for (const [pattern, command] of container.commands) {
      if (!doMatch(pattern, event.object.message.text)) {
        continue;
      }
      const commandResponse = await safePromise(command(event), timeout);
      if (verifyCommandResponse(commandResponse)) {
        await reply(commandResponse, event);
      }
      console.log(clc.green('[success] response is sent'));
      break;
    }
  } catch (e) {
    console.log(clc.red('[error] command failed'));
    const badCommandResponse = uncaughtCommandErrorResponse
      ? uncaughtCommandErrorResponse
      : DEFAULT_UNCAUGHT_COMMAND_ERROR_RESPONSE;
    await reply(badCommandResponse, event);
  }
}
