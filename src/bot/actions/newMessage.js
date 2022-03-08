import { checkRequest } from '../utilities/regexp.js';
import { getRequest } from '../utilities/regexp.js';
import { sendMessage } from '../../vk/api.js';
import BotResponse from '../utilities/BotResponse.js';
import commands from '../commands.js';

export default function newMessage(data, end) {
  if (checkRequest(data.object.message.text)) {
    const request = getRequest(data.object.message.text);
    const command = commands[request.command];

    if (typeof command === 'function') {
      return command(request, data, weakBotResponse => {
        const botResponse = new BotResponse(weakBotResponse);
        sendMessage(botResponse, data, end);
      });
    }
  }
  return end();
}
