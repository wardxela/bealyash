import { BOT_NAME } from '../../config.js';

export const CALL_TEMPLATE = new RegExp(
  `^${BOT_NAME}\\s[а-я]+(\\s[а-я0-9]+)*$`,
  'i'
);

export function checkRequest(message) {
  return CALL_TEMPLATE.test(message);
}

export function getRequest(message) {
  const call = message.split(' ');

  const request = {};

  request.botName = call[0];
  request.command = call[1].toLowerCase();
  request.values = call.slice(2);

  return request;
}
