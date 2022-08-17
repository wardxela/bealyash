import { BotCommand } from '../../../../core';
import { findOrCreateProfile } from '../../../../services/db';
import {
  createVkMemberLink,
  getGroups,
  getUsers,
} from '../../../../services/vk';
import { getTimeDiff, ruNumberToString } from '../../../../utils';

export const getProfile: BotCommand = async event => {
  const { from_id, peer_id } = event.object.message;

  const profilePromise = findOrCreateProfile(from_id, peer_id);
  const memberPromise = from_id > 0 ? getUsers(from_id) : getGroups(-from_id);

  const [profile, member] = await Promise.all([profilePromise, memberPromise]);

  const name = createVkMemberLink(member.response[0]);
  const roles = !profile.rolesOnProfile.length
    ? 'Не имеешь ни одной роли'
    : `Имеешь роли: ${profile.rolesOnProfile.reduce(
        (acc, { role }) => `${!acc ? acc : `${acc}, `}${role.name}`,
        ''
      )}`;

  const boostersList = profile.boostersOnProfile.reduce((acc, booster) => {
    const diff = getTimeDiff(booster.expirationDate);
    if (diff > 0) {
      return acc;
    }
    const expiresIn = Math.round(-diff / 60000);
    return `${!acc ? acc : `${acc}, `}${
      booster.booster.title
    } (${expiresIn} мин.)`;
  }, '');
  const boosters = boostersList
    ? `Имеешь бусты: ${boostersList}`
    : 'Не имеешь бустов';

  const gayCount = `Был пидором ${ruNumberToString(profile.gayCounter)}`;
  const message = `${name}, в этой беседе ты:\n${gayCount}\n${roles}\n${boosters}`;

  return {
    message,
  };
};
