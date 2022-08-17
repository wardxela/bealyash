import { BotCommand } from '../../../core';
import { db } from '../../../services/db';
import { createVkMemberLink, getGroups, getUsers } from '../../../services/vk';
import { random } from '../../../utils';

export const useBoost: BotCommand = async (event, match) => {
  const { from_id, peer_id } = event.object.message;
  const category = 'Gay';

  const memberPromise = from_id > 0 ? getUsers(from_id) : getGroups(-from_id);
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

  const coefficientSum = await db.booster.aggregate({
    where: { category: { title: category } },
    _sum: { probabilityCoefficient: true },
  });

  if (!coefficientSum._sum.probabilityCoefficient) {
    return { message: 'Бустов нет' };
  }

  const randomNumber = random(1, coefficientSum._sum.probabilityCoefficient);
  const boosters = await db.booster.findMany({
    where: { category: { title: category } },
    select: {
      id: true,
      duration: true,
      probabilityCoefficient: true,
      description: true,
      title: true,
      photo: true,
    },
  });

  let range = 0;
  let randomBooster: typeof boosters[number] | null = null;
  for (const booster of boosters) {
    range += booster.probabilityCoefficient;
    if (randomNumber <= range) {
      randomBooster = booster;
      break;
    }
  }

  if (!randomBooster) {
    return { message: 'Внутренний алгоритм рандома сломан(' };
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
    message: `${createVkMemberLink(member)}, ты получил новый буст - "${
      randomBooster.title
    }"\nОписание: ${randomBooster.description}`,
    attachment: randomBooster.photo ? randomBooster.photo : '',
  };
};