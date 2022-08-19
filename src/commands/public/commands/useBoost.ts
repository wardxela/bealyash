import { BotCommand } from '../../../core';
import { db } from '../../../services/db';
import { createVkMemberLink, getUsersOrGroups } from '../../../services/vk';
import { randomFloat } from '../../../utils';

export const useBoost: BotCommand = async event => {
  const { from_id, peer_id } = event.object.message;
  const category = 'Gay';

  const memberPromise = getUsersOrGroups(from_id);
  const profilePromise = db.profile.findFirst({
    where: {
      userId: from_id,
      chatId: peer_id,
      booster: { category: { title: category } },
      boosterExpirationDate: { gt: new Date() },
    },
    select: {
      booster: { select: { title: true } },
    },
  });
  const [memberData, profile] = await Promise.all([
    memberPromise,
    profilePromise,
  ]);

  const member = memberData.response[0];

  if (profile && profile.booster) {
    return {
      message: `У ${createVkMemberLink(member, 'тебя')} уже есть буст "${
        profile.booster.title
      }"`,
    };
  }

  const boosters = await db.booster.findMany({
    where: { category: { title: category } },
    select: {
      id: true,
      duration: true,
      description: true,
      rarity: true,
      title: true,
      photo: true,
    },
  });

  const totalOutcomes = boosters.reduce(
    (a, booster) => a + booster.rarity.probability,
    0
  );

  const randomNumber = randomFloat(0, totalOutcomes);

  let range = totalOutcomes;
  let randomBooster: typeof boosters[number] | null = null;
  for (const booster of boosters) {
    range -= booster.rarity.probability;
    if (range <= randomNumber) {
      randomBooster = booster;
      break;
    }
  }

  if (!randomBooster) {
    return { message: 'У беляша нет бустеров :(' };
  }

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
          where: { id: peer_id },
          create: { id: peer_id },
        },
      },
      booster: { connect: { id: randomBooster.id } },
      boosterExpirationDate: new Date(Date.now() + randomBooster.duration),
    },
    update: {
      booster: { connect: { id: randomBooster.id } },
      boosterExpirationDate: new Date(Date.now() + randomBooster.duration),
    },
    select: null,
  });

  return {
    message: `${createVkMemberLink(member)}, ты получил буст "${
      randomBooster.title
    }"\nРедкость: ${randomBooster.rarity.title}\nОписание: ${
      randomBooster.description
    }`,
    attachment: randomBooster.photo ? randomBooster.photo : '',
  };
};
