import { BotResponse, VkBody } from '../interfaces';
import { auth, commander } from './features';

export async function navigator(body: VkBody): Promise<BotResponse> {
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
