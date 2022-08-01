import { BotResponse } from '../interfaces';
import { VkBody } from '../vk';
import { auth } from './auth';
import { controller } from './controller';

export async function bot(body: VkBody): Promise<BotResponse> {
  switch (body.type) {
    case 'confirmation':
      return auth();
    case 'message_new':
      await controller(body);
  }

  return {
    status: 200,
    message: 'ok',
  };
}
