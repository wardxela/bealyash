import { BotCommand } from '../../../core';
import { db, findOrCreateProfile } from '../../../services/db';
import { createVkMemberLink, getGroups, getUsers } from '../../../services/vk';
import { random } from '../../../utils';

export const useBoost: BotCommand = async event => {
  const { from_id, peer_id } = event.object.message;

  const memberPromise = from_id > 0 ? getUsers(from_id) : getGroups(-from_id);
  const profilePromise = findOrCreateProfile(from_id, peer_id);
  const [memberData, profile] = await Promise.all([
    memberPromise,
    profilePromise,
  ]);

  const member = memberData.response[0];

  if (
    profile.boosterExpirationDate &&
    profile.boosterExpirationDate > new Date()
  ) {
    return {
      message: `У ${createVkMemberLink(member, 'тебя')} уже есть буст "${
        profile.booster?.title
      }"`,
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
    message: `${createVkMemberLink(member)}, ты получил новый буст - "${
      randomBooster.title
    }"\nОписание: ${randomBooster.description}`,
  };
};
