import { BotCommand } from '../../../core';
import { db } from '../../../services/db';
import { createVkMediaURL } from '../../../services/vk';
import { randomFrom, randomInt } from '../../../utils';

export const getKun: BotCommand = async (event, match) => {
  let count = match[1].includes('ы') ? 10 : parseInt(match[2]) || 1;
  const totalCount = await db.kun.count();
  let offset = randomInt(0, totalCount - 1);
  const tail = offset + count - totalCount;
  if (tail > 0) {
    offset -= tail;
  }
  if (offset < 0) {
    count += offset;
    offset = 0;
  }
  const kuns = await db.kun.findMany({
    skip: offset,
    take: count,
    include: {
      photo: {
        include: {
          type: true,
        },
      },
    },
  });
  if (!kuns.length) {
    return { message: 'Кунов нет' };
  }
  const message =
    kuns.length === 1
      ? randomFrom([
          'Держи опасного',
          'Держи куна',
          'Держи красавчика',
          'Держи кунчика',
        ])
      : randomFrom(['Кунчики', 'Куны']);

  const attachment = kuns
    .map(kun =>
      createVkMediaURL(
        kun.photo.type.name,
        kun.photo.ownerId,
        kun.photo.mediaId,
        kun.photo.accessKey
      )
    )
    .join();

  return { message, attachment };
};
