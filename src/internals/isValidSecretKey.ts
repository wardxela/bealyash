import { settings } from '../settings';
import { VkBody } from '../vk';

export function isValidSecretKey(body: VkBody): Boolean {
  return body.secret === settings.secretKey;
}
