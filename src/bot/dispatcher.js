import { sendMessage } from '../vk/api.js';
import commands from './commands.js';
import { splitMessage } from './utilities/regexp.js';

export default function dispatcher(data, end) {
  const call = splitMessage(data.object.message.text);
  const command = commands[call.command];

  if (typeof command === 'function') {
    command(call.value, result => {
      sendMessage(
        {
          to: data.object.message.peer_id,
          message: result,
        },
        end
      );
    });
  }

  return end();
}
