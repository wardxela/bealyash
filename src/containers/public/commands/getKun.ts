import { BotCommand } from '../../../core';
import { db } from '../../../services/db';
import { createVkMediaURL } from '../../../services/vk';
import { randomFrom, randomRange } from '../../../utils';

export const getKun: BotCommand = async (_, match) => {
  const n = parseInt(match[2]);
  const length = n ? n : match[1].includes('ы') ? 10 : 1;
  const [skip, take] = randomRange(await db.kun.count(), length);
  const kuns = await db.kun.findMany({
    skip,
    take,
    include: {
      photo: {
        include: { type: true },
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
