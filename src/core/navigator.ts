import { BotResponse } from '../interfaces';
import { VkBody } from '../vk';
import { auth } from './features/auth';
import { commander } from './features/commander';

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
