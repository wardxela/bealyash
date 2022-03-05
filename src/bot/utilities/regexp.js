import { BOT_NAME } from '../../config.js';

export const CALL_TEMPLATE = new RegExp(
  `^${BOT_NAME}\\s[а-я]+(\\s[а-я0-9]+)*$`,
  'i'
);

export function isCallToBot(message) {
  return CALL_TEMPLATE.test(message);
}

export function splitMessage(message) {
  const call = message.split(' ');

  const request = {};

  request.botName = call[0];
  request.command = call[1];
  request.value = call.slice(2);

  return request;
}
