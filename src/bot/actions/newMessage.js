import { checkRequest } from '../utilities/regexp.js';
import { getRequest } from '../utilities/regexp.js';
import { sendMessage } from '../../vk/api.js';
import commands from '../commands.js';
import filterResponse from '../utilities/filters.js';

export default function newMessage(data, end) {
  if (checkRequest(data.object.message.text)) {
    const request = getRequest(data.object.message.text);
    const command = commands[request.command];

    if (typeof command === 'function') {
      return command(request, data, botResponse => {
        filterResponse(botResponse);
        sendMessage(botResponse, data, end);
      });
    }
  }
  return end();
}
