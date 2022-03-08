import { request, get } from 'https';
import { VK_API } from '../config.js';
import { vkQuery, getJSONbody } from './helpers.js';

export function sendMessage(botResponse, data, end) {
  const randomId = Math.round(Math.random() * 10000000000);

  const query = vkQuery({
    peer_id: data.object.message.peer_id,
    random_id: randomId,
    ...botResponse,
  });

  const req = request(
    {
      hostname: VK_API,
      path: `/method/messages.send?${query}`,
      method: 'POST',
    },
    end
  );

  req.end();
}

export function getVkConversationMembers(params, callback) {
  const query = vkQuery(params);

  get(
    {
      hostname: VK_API,
      path: `/method/messages.getConversationMembers?${query}`,
    },
    res => getJSONbody(res, callback)
  );
}

export function getVkUsers(params, callback) {
  const query = vkQuery(params);

  get(
    {
      hostname: VK_API,
      path: `/method/users.get?${query}`,
    },
    res => getJSONbody(res, callback)
  );
}
