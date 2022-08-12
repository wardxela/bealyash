import clc from 'cli-color';
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
        console.log(clc.red("[error] one of the guards didn't pass"));
        return;
      }
    }
    console.log(clc.green('[success] all guards passed'));
    for (const [pattern, command] of commands) {
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
