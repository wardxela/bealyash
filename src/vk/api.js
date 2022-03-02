import { request } from 'https';
import { stringify } from 'querystring';
import { VK_API, VK_API_TOKEN, VK_API_VER } from '../config.js';
import { SEND_MESSAGE } from '../vk/types.js';

export function sendMessage({ to, message }, callback) {
  const randomId = Math.round(Math.random() * 100000000000000);

  const query = stringify({
    access_token: VK_API_TOKEN,
    peer_id: to,
    message: message,
    v: VK_API_VER,
    random_id: randomId,
  });

  const req = request(
    `${VK_API}/method/${SEND_MESSAGE}/?${query}`,
    {
      method: 'POST',
    },
    res => {
      callback();
    }
  );

  return req.end();
}
