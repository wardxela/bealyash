import { commands } from '../../commands';
import { randomInt32 } from '../helpers';
import { vkAxios, VkMessageBody, VkSendMessagesRequest } from '../vk';

export async function commander(body: VkMessageBody) {
  for (const [pattern, command] of commands) {
    if (pattern.test(body.object.message.text)) {
      const payload = await command(body);
      const options: VkSendMessagesRequest = {
        ...payload,
        random_id: randomInt32(),
        peer_id: payload.peer_id
          ? payload.peer_id
          : body.object.message.peer_id,
      };

      return vkAxios('messages.send', options, false);
    }
  }
}
