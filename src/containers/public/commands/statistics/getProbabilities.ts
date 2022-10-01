import * as R from 'rambda';
import { BotCommand } from '../../../../core';
import { db } from '../../../../services/db';
import {
  createVkMemberName,
  findMemberById,
  getConversationMembers,
} from '../../../../services/vk';
import {
  calcProbability,
  calcTotalOutcomes,
  createCoefficientMap,
  getCoefficient,
} from '../../../../utils/probabilities';

const boosterCategoryMap: Record<string, string> = {
  опидорения: 'Gay',
};

export const getProbabilities: BotCommand = async (event, match) => {
  const { peer_id } = event.object.message;
  const categoryAlias = match[2].toLowerCase();

  const category = boosterCategoryMap[match[2].toLowerCase()];

  const membersPromise = getConversationMembers(peer_id);
  const profilesPromise = db.profile.findMany({
    where: {
      chat: { id: peer_id },
      boosterExpirationDate: { gt: new Date() },
      booster: { category: { title: category } },
    },
    select: {
      userId: true,
      booster: { select: { value: true } },
    },
  });
  const [membersResponse, profiles] = await Promise.all([
    membersPromise,
    profilesPromise,
  ]);

  const members = membersResponse.response.items;

  const ids = R.pluck('member_id', members);
  const coefficientMap = createCoefficientMap(
    profiles,
    'userId',
    'booster.value'
  );

  const sortedMembers = [...members].sort((a, b) => {
    const bCoefficient = getCoefficient(coefficientMap, b.member_id);
    const aCoefficient = getCoefficient(coefficientMap, a.member_id);
    return bCoefficient - aCoefficient;
  });

  const probabilities = sortedMembers.reduce((a, m) => {
    const name = createVkMemberName(
      findMemberById(m.member_id, membersResponse)!
    );
    const probability = calcProbability(coefficientMap, ids, m.member_id);
    return `${a}\n${name} - ${probability}%`;
  }, `Вероятность ${categoryAlias}:\n`);

  return { message: probabilities };
};
