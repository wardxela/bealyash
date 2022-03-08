import { getVkUsers } from '../../vk/api.js';

export default function presentBelyash(request, data, callback) {
  if (!data.object.message.reply_message) {
    return callback({ message: 'Эта команда работает только на ответ' });
  }

  getVkUsers(
    {
      user_ids: `${data.object.message.from_id},${data.object.message.reply_message.from_id}`,
    },
    ({ response }) => {
      if (response.length !== 2) {
        return callback({ message: 'Пошел нахуй' });
      }
      const user1 = response[0];
      const user2 = response[1];
      return callback({
        message: `[id${user1.id}|${user1.first_name} ${user1.last_name}] подарил беляш [id${user2.id}|${user2.first_name} ${user2.last_name}]`,
        attachment: 'photo-210983855_457239017%2Falbum-210983855_0%2Frev',
      });
    }
  );
}
