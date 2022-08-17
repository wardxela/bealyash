import { BotCommand } from '../../../../core';
import { db, getBoosterCoefficient } from '../../../../services/db';
import {
  createVkMemberName,
  findMemberById,
  getConversationMembers,
} from '../../../../services/vk';
import { createMap } from '../../../../utils';

const boosterCategoryMap: Record<string, string> = {
  опидорения: 'Gay',
};
const commandMap: Record<string, string> = {
  опидорения: 'кто пидор',
};

export const getProbabilities: BotCommand = async (event, match) => {
  const { peer_id } = event.object.message;
  const category = boosterCategoryMap[match[3]];
  const command = commandMap[match[3]];

  const membersPromise = getConversationMembers(peer_id);
  const profilesPromise = db.profile.findMany({
    where: {
      chat: {
        id: peer_id,
      },
      boosterExpirationDate: {
        gt: new Date(),
      },
      booster: {
        category: {
          title: category,
        },
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
  const [membersResponse, profiles] = await Promise.all([
    membersPromise,
    profilesPromise,
  ]);

  const members = membersResponse.response.items;
  const profilesMap = createMap(profiles, 'userId');
  const totalOutcomes = members.reduce((a, m) => {
    return a + getBoosterCoefficient(profilesMap[m.member_id]);
  }, 0);

  const sortedMembers = [...members].sort((a, b) => {
    const bCoefficient = getBoosterCoefficient(profilesMap[b.member_id]);
    const aCoefficient = getBoosterCoefficient(profilesMap[a.member_id]);
    return bCoefficient - aCoefficient;
  });

  const probabilities = sortedMembers.reduce((a, m) => {
    const member = findMemberById(m.member_id, membersResponse)!;
    const name = createVkMemberName(member);
    const favorableOutcomes = getBoosterCoefficient(profilesMap[m.member_id]);
    const probability =
      Math.round((10000 * favorableOutcomes) / totalOutcomes) / 100;
    return `${a}${name} - ${probability}%\n`;
  }, `Вероятность выпадения каждого члена в беседе при вызове команды \`${command}\`:\n`);

  return {
    message: probabilities,
  };
};
