import { stringify } from 'querystring';
import { VK_API_TOKEN, VK_API_VER } from '../config.js';

export function vkQuery(params) {
  return stringify({
    access_token: VK_API_TOKEN,
    v: VK_API_VER,
    ...params,
  });
}

export function getJSONbody(responseStream, callback) {
  let __responseBody = '';

  responseStream.on('data', chunk => {
    __responseBody += chunk;
  });

  responseStream.on('end', () => {
    callback(JSON.parse(__responseBody));
  });
}
