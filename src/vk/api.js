import { httpGet, httpPost } from '../fetch.js';
import { vkQuery } from './helpers.js';
import { VK_API } from '../config.js';

export async function sendVkMessage(botResponse, vkRequest) {
  const random_id = Math.round(Math.random() * 10000000000);

  const query = vkQuery({
    peer_id: vkRequest.object.message.peer_id,
    random_id,
    ...botResponse,
  });

  const response = await httpPost({
    hostname: VK_API,
    path: `/method/messages.send?${query}`,
  });

  return response;
}

export async function getVkConversationMembers(params) {
  const query = vkQuery(params);

  const data = await httpGet({
    hostname: VK_API,
    path: `/method/messages.getConversationMembers?${query}`,
  });

  return JSON.parse(data);
}

export async function getVkUsers(params) {
  const query = vkQuery(params);

  const data = await httpGet({
    hostname: VK_API,
    path: `/method/users.get?${query}`,
  });

  return JSON.parse(data);
}
