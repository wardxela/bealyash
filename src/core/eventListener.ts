import { BotResponse } from './interfaces';
import { auth, commander } from './features';
import { VkBody } from './vk';

export async function eventListener(body: VkBody): Promise<BotResponse> {
  switch (body.type) {
    case 'confirmation':
      return auth();
    case 'message_new':
      await commander(body);
  }

  return {
    status: 200,
    message: 'ok',
  };
}
