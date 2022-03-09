import { BOT_NAME } from '../../config.js';

export const CALL_TEMPLATE = new RegExp(
  `^${BOT_NAME}\\s[а-я]+(\\s[а-я0-9]+)*$`,
  'i'
);

export function checkRequestMessage(message) {
  return CALL_TEMPLATE.test(message);
}

export function getRequestMessage(message) {
  const call = message.split(' ');

  const requestMessage = {};

  requestMessage.botName = call[0];
  requestMessage.command = call[1].toLowerCase();
  requestMessage.values = call.slice(2);

  return requestMessage;
}
