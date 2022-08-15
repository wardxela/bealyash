import { BotCommand } from '../../../core';
import {
  db,
  GAY_COEFFICIENT,
  getBoosterCoefficient,
} from '../../../services/db';
import {
  createVkLink,
  findMemberById,
  getConversationMembers,
} from '../../../services/vk';
import { createMap } from '../../../utils';

export const gayProbabilities: BotCommand = async event => {
  const { peer_id } = event.object.message;

  const membersPromise = getConversationMembers(peer_id);
  const profilesPromise = db.profile.findMany({
    where: { chatId: peer_id },
    select: {
      booster: { select: { coefficient: true } },
      userId: true,
      boosterExpirationDate: true,
    },
  });
  const [membersResponse, profiles] = await Promise.all([
    membersPromise,
    profilesPromise,
  ]);

  const members = membersResponse.response.items;
  const profilesMap = createMap(profiles, 'userId');

  const totalOutcomes = members.reduce((a, m) => {
    return (
      a + GAY_COEFFICIENT + getBoosterCoefficient(profilesMap[m.member_id])
    );
  }, 0);

  const sortedMembers = [...members].sort((a, b) => {
    const bCoefficient = getBoosterCoefficient(profilesMap[b.member_id]);
    const aCoefficient = getBoosterCoefficient(profilesMap[a.member_id]);
    return bCoefficient - aCoefficient;
  });

  const probabilities = sortedMembers.reduce((a, m) => {
    const member = findMemberById(m.member_id, membersResponse)!;
    const name = createVkLink(member);
    const favorableOutcomes =
      GAY_COEFFICIENT + getBoosterCoefficient(profilesMap[m.member_id]);
    const probability =
      Math.round((10000 * favorableOutcomes) / totalOutcomes) / 100;
    return `${a}${name} - ${probability}%\n`;
  }, 'Беляш напряг свой искусственный мозг и подсчитал вероятность выпадения каждого члена в беседе при вызове команды `кто пидор`:\n');

  return {
    message: probabilities,
  };
};
