import { commands } from '../commands';
import { VkMessageBody } from '../vk';

export async function controller(body: VkMessageBody) {
  for (const [pattern, command] of commands) {
    if (pattern.test(body.object.message.text)) {
      return command(body);
    }
  }
}
