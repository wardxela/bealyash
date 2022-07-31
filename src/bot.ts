import { BotResponse } from './interfaces';
import { auth, controller, isValidSecretKey } from './internals';
import { JSON_ERROR, VK_ERROR } from './errors';
import { VkBody } from './vk';

export async function bot(body: VkBody | null): Promise<BotResponse> {
  if (body === null) {
    return JSON_ERROR;
  }

  if (!isValidSecretKey(body)) {
    return VK_ERROR;
  }

  if (body.type === 'confirmation') {
    return auth();
  }

  if (body.type === 'message_new') {
    await controller(body);
  }

  return {
    status: 200,
    message: 'ok',
  };
}
