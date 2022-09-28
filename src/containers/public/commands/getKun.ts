import { BotCommand } from '../../../core';
import { db } from '../../../services/db';
import { createVkMediaURL } from '../../../services/vk';
import { randomFrom, randomInt } from '../../../utils';

export const getKun: BotCommand = async () => {
  const count = await db.kun.count();
  const offset = randomInt(0, count - 1);
  const kun = await db.kun.findFirst({
    skip: offset,
    include: {
      photo: {
        include: {
          type: true,
        },
      },
    },
  });
  if (!kun) {
    return { message: 'Кунов нет' };
  }
  return {
    message: randomFrom(['Держи опасного', 'Держи куна', 'Держи красавчика']),
    attachment: createVkMediaURL(
      kun.photo.type.name,
      kun.photo.ownerId,
      kun.photo.mediaId,
      kun.photo.accessKey
    ),
  };
};
