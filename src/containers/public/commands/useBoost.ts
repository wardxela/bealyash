import { BotCommand } from '../../../core';
import { db } from '../../../services/db';
import { createVkMemberLink, getGroups, getUsers } from '../../../services/vk';
import { random } from '../../../utils';

export const useBoost: BotCommand = async event => {
  const { from_id, peer_id } = event.object.message;

  const memberPromise = from_id > 0 ? getUsers(from_id) : getGroups(-from_id);
  const boosterPromise = db.boostersOnProfiles.findFirst({
    where: {
      userId: from_id,
      chatId: peer_id,
      booster: {
        category: {
          title: 'Gay',
        },
      },
      expirationDate: {
        gt: new Date(),
      },
    },
    select: {
      booster: {
        select: {
          title: true,
        },
      },
    },
  });
  const [memberData, booster] = await Promise.all([
    memberPromise,
    boosterPromise,
  ]);

  const member = memberData.response[0];

  if (booster) {
    return {
      message: `У ${createVkMemberLink(member, 'тебя')} уже есть буст "${
        booster.booster.title
      }"`,
    };
  }

  const boosterCount = await db.booster.count({
    where: { category: { title: 'Gay' } },
  });
  const boosterOffset = random(0, boosterCount - 1);
  const randomBooster = await db.booster.findFirstOrThrow({
    where: { category: { title: 'Gay' } },
    skip: boosterOffset,
  });

  await db.boostersOnProfiles.upsert({
    where: {
      userId_chatId_boosterId: {
        userId: from_id,
        chatId: peer_id,
        boosterId: randomBooster.id,
      },
    },
    create: {
      profile: {
        connectOrCreate: {
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
          },
        },
      },
      booster: {
        connect: {
          id: randomBooster.id,
        },
      },
      expirationDate: new Date(Date.now() + randomBooster.duration),
    },
    update: {
      expirationDate: new Date(Date.now() + randomBooster.duration),
    },
    select: null,
  });

  return {
    message: `${createVkMemberLink(member)}, ты получил новый буст - "${
      randomBooster.title
    }"\nОписание: ${randomBooster.description}`,
  };
};
