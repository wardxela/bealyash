export default function presentBelyash(request, data, callback) {
  if (!data.object.message.reply_message) {
    return callback({ message: 'Эта команда работает только на ответ' });
  }

  return callback({ message: 'Пошел нахуй' });
}
