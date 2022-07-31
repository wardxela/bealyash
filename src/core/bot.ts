import { BotBody, BotResponse } from './interfaces';
import { auth, isValidSecretKey } from './internals';
import { JSON_ERROR, VK_ERROR } from './errors';
import { sendMessage } from './vk';

export async function bot(body: BotBody | null): Promise<BotResponse> {
  if (body === null) {
    return JSON_ERROR;
  }

  if (!isValidSecretKey(body)) {
    return VK_ERROR;
  }

  if (body.type === 'confirmation') {
    return auth();
  }

  try {
    const response = await sendMessage();
    console.log(response);
  } catch (e) {
    console.log('here');
  }

  return {
    status: 200,
    message: 'ok',
  };
}
