import { commands } from '../../commands';
import { VkMessageBody } from '../../interfaces';
import { sendVkMessage } from '../vk';

export async function commander(body: VkMessageBody) {
  for (const [pattern, command] of commands) {
    if (pattern.test(body.object.message.text)) {
      const payload = await command(body);
      const options = {
        ...payload,
        peer_id: payload.peer_id
          ? payload.peer_id
          : body.object.message.peer_id,
      };
      return sendVkMessage(options);
    }
  }
}
