import { sendMessage } from '../vk/api.js';
import { NEW_MESSAGE } from '../vk/types.js';

export default function bot(data, end) {
  if (data.error) {
    return end(data.error);
  }

  const randomNumber = Math.round(Math.random() * 100);

  const options = {
    message: `Ты Ивашка на ${randomNumber}%`,
    to: data.object.message.peer_id,
  };

  if (data.type === NEW_MESSAGE) {
    if (data.object.message.text.toLowerCase().startsWith('беляш ')) {
      return sendMessage(options, () => {
        end('ok');
      });
    }
  }

  return end('ok');
}
