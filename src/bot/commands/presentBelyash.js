import { getConversationMembers } from '../../vk/api.js';

export default function presentBelyash(request, data, callback) {
  if (!data.object.message.reply_message) {
    return callback({ text: 'Эта команда работает только на ответ' });
  }

  return callback({ text: 'Пошел нахуй' });
}
