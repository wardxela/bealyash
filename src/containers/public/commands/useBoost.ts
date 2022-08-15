import { BotCommand } from '../../../core';
import { db, findOrCreateProfile } from '../../../services/db';
import { createVkLink, getUsers } from '../../../services/vk';
import { random } from '../../../utils';

export const useBoost: BotCommand = async event => {
  const { from_id, peer_id } = event.object.message;

  const userPromise = getUsers(from_id);
  const profilePromise = findOrCreateProfile(from_id, peer_id);
  const [user, profile] = await Promise.all([userPromise, profilePromise]);

  const name = createVkLink(user.response[0]);

  if (
    profile.boosterExpirationDate &&
    profile.boosterExpirationDate > new Date()
  ) {
    return {
      message: `Пользователь ${name} уже имеет буст "${profile.booster?.title}"`,
    };
  }

  const boosterCount = await db.booster.count();
  const boosterOffset = random(0, boosterCount - 1);
  const randomBooster = await db.booster.findFirstOrThrow({
    skip: boosterOffset,
  });

  await db.profile.upsert({
    where: {
      userId_chatId: {
        userId: from_id,
        chatId: peer_id,
      },
    },
    create: {
      userId: from_id,
      chat: {
        connectOrCreate: {
          where: {
            id: peer_id,
          },
          create: {
            id: peer_id,
          },
        },
      },
      booster: {
        connect: {
          id: randomBooster.id,
        },
      },
      boosterExpirationDate: new Date(Date.now() + randomBooster.duration),
    },
    update: {
      booster: {
        connect: {
          id: randomBooster.id,
        },
      },
      boosterExpirationDate: new Date(Date.now() + randomBooster.duration),
    },
  });

  return {
    message: `Пользователь ${name} получил буст - "${randomBooster.title}"\nОписание: ${randomBooster.description}`,
  };
};
