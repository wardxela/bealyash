import { stringify } from 'querystring';
import { VK_API_TOKEN, VK_API_VER } from '../config.js';

export function vkQuery(params) {
  return stringify({
    access_token: VK_API_TOKEN,
    v: VK_API_VER,
    lang: 0,
    ...params,
  });
}
