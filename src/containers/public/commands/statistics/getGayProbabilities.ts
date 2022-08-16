import { BotCommand } from '../../../../core';
import { db, getBoosterCoefficient } from '../../../../services/db';
import {
  createVkMemberName,
  findMemberById,
  getConversationMembers,
} from '../../../../services/vk';
import { createMap } from '../../../../utils';

export const getGayProbabilities: BotCommand = async event => {
  const { peer_id } = event.object.message;

  const membersPromise = getConversationMembers(peer_id);
  const boostersPromise = db.boostersOnProfiles.findMany({
    where: {
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
      userId: true,
      booster: {
        select: {
          coefficientOffset: true,
        },
      },
    },
  });
  const [membersResponse, boosters] = await Promise.all([
    membersPromise,
    boostersPromise,
  ]);

  const members = membersResponse.response.items;
  const boostersMap = createMap(boosters, 'userId');
  const totalOutcomes = members.reduce((a, m) => {
    return a + getBoosterCoefficient(boostersMap[m.member_id]);
  }, 0);

  const sortedMembers = [...members].sort((a, b) => {
    const bCoefficient = getBoosterCoefficient(boostersMap[b.member_id]);
    const aCoefficient = getBoosterCoefficient(boostersMap[a.member_id]);
    return bCoefficient - aCoefficient;
  });

  const probabilities = sortedMembers.reduce((a, m) => {
    const member = findMemberById(m.member_id, membersResponse)!;
    const name = createVkMemberName(member);
    const favorableOutcomes = getBoosterCoefficient(boostersMap[m.member_id]);
    const probability =
      Math.round((10000 * favorableOutcomes) / totalOutcomes) / 100;
    return `${a}${name} - ${probability}%\n`;
  }, 'Вероятность выпадения каждого члена в беседе при вызове команды `кто пидор`:\n');

  return {
    message: probabilities,
  };
};
