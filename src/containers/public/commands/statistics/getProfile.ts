import * as R from 'rambda';
import { BotCommand } from '../../../../core';
import { db, findOrCreateProfile } from '../../../../services/db';
import {
  createVkMemberLink,
  getConversationMembers,
  getGroups,
  getUsers,
} from '../../../../services/vk';
import { getTimeDiff, ruNumberToString, timeToString } from '../../../../utils';
import {
  calcProbability,
  createCoefficientMap,
} from '../../../../utils/probabilities';

export const getProfile: BotCommand = async event => {
  const { from_id, peer_id } = event.object.message;
  const profilePromise = findOrCreateProfile(from_id, peer_id);
  const memberPromise = from_id > 0 ? getUsers(from_id) : getGroups(-from_id);
  const membersPromise = getConversationMembers(peer_id);
  const profilesPromise = db.profile.findMany({
    where: {
      chat: { id: peer_id },
      boosterExpirationDate: { gt: new Date() },
      booster: { category: { title: 'Gay' } },
    },
    select: {
      userId: true,
      booster: { select: { value: true } },
    },
  });

  const [profile, member, members, profiles] = await Promise.all([
    profilePromise,
    memberPromise,
    membersPromise,
    profilesPromise,
  ]);
  const ids = R.pluck('member_id', members.response.items);
  const coefficientMap = createCoefficientMap(
    profiles,
    'userId',
    'booster.value'
  );

  const roles =
    profile.rolesOnProfile.reduce(
      (acc, { role }) => `${!acc ? acc : `${acc}, `}${role.name}`,
      ''
    ) || 'нету';

  let booster = 'нету';

  if (
    profile.booster &&
    profile.boosterExpirationDate &&
    profile.boosterExpirationDate > new Date()
  ) {
    const expiresIn = timeToString(-getTimeDiff(profile.boosterExpirationDate));
    booster = `"${profile.booster.title}" (${expiresIn})`;
  }

  const message = `&#128202; ${createVkMemberLink(
    member.response[0]
  )}, твой профиль:
  &#11088; Опыт - ${profile.xp} XP
  &#127987;&#65039;&#8205;&#127752; Пидор - ${ruNumberToString(
    profile.gayCounter
  )}
  &#128101; Роли - ${roles}
  &#9889; Буст - ${booster}
  &#128175; Шанс опидорения - ${calcProbability(
    coefficientMap,
    ids,
    profile.userId
  )}%`;

  return { message };
};
