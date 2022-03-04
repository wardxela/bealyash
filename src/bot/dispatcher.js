import { sendMessage } from '../vk/api.js';
import commands from './commands.js';
import { splitMessage } from './utilities/regexp.js';

export default function dispatcher(data, end) {
  const call = splitMessage(data.object.message.text);
  const command = commands[call.command];

  if (typeof command === 'function') {
    command(call.value, data, result => {
      sendMessage(
        {
          peer_id: data.object.message.peer_id,
          result: result,
        },
        end
      );
    });
  }

  return end();
}
