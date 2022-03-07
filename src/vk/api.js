import { request } from 'https';
import { stringify } from 'querystring';
import { VK_API, VK_API_TOKEN, VK_API_VER } from '../config.js';

export function sendMessage(botResponse, data, end) {
  const randomId = Math.round(Math.random() * 10000000000);

  const query = stringify({
    access_token: VK_API_TOKEN,
    peer_id: data.object.message.peer_id,
    message: botResponse.text,
    v: VK_API_VER,
    random_id: randomId,
    attachment: botResponse.attachment ?? '',
  });

  const req = request(
    `${VK_API}/method/messages.send?${query}`,
    {
      method: 'POST',
    },
    () => {
      end();
    }
  );

  return req.end();
}

export function getConversationMembers({ peer_id }, callback) {
  const query = stringify({
    access_token: VK_API_TOKEN,
    peer_id: peer_id,
    v: VK_API_VER,
    lang: 0,
  });

  const req = request(
    `${VK_API}/method/messages.getConversationMembers?${query}`,
    { method: 'GET' },
    res => {
      let __responseBody = '';

      res.on('data', chunk => {
        __responseBody += chunk;
      });

      res.on('end', () => {
        callback(JSON.parse(__responseBody));
      });
    }
  );

  req.end();
}
