import { commands } from '../../commands';
import { VkMessageBody } from '../../vk';

export async function commander(body: VkMessageBody) {
  for (const [pattern, command] of commands) {
    if (pattern.test(body.object.message.text)) {
      return command(body);
    }
  }
}
