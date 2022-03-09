import { checkRequestMessage } from '../utilities/regexp.js';
import { getRequestMessage } from '../utilities/regexp.js';
import { sendVkMessage } from '../../vk/api.js';
import commands from '../commands.js';

export default async function newMessage(vkRequest) {
  if (!checkRequestMessage(vkRequest.object.message.text)) {
    return;
  }

  const requestMessage = getRequestMessage(vkRequest.object.message.text);
  const command = commands[requestMessage.command];

  if (typeof command !== 'function') {
    return;
  }

  const botResponse = await command(requestMessage, vkRequest);

  return await sendVkMessage(botResponse, vkRequest);
}
