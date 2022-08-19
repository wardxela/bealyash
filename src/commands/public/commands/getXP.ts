import { BotCommand } from '../../../core';
import { db, findOrCreateProfile } from '../../../services/db';
import { createVkMemberName, getUsersOrGroups } from '../../../services/vk';
import {
  getTimeDiff,
  HOUR,
  MINUTE,
  randomInt,
  timeToString,
} from '../../../utils';

export const getXP: BotCommand = async event => {
  const { from_id, peer_id } = event.object.message;

  const profilePromise = findOrCreateProfile(from_id, peer_id);
  const memberPromise = getUsersOrGroups(from_id);
  const [profile, member] = await Promise.all([profilePromise, memberPromise]);
  const name = createVkMemberName(member.response[0]);

  const timeDiff = getTimeDiff(profile.xpUpdatedAt);
  if (timeDiff < HOUR * 3) {
    const timeToWait = HOUR * 3 - timeDiff;
    const timeInfo = `Приходи через ${timeToString(timeToWait)}`;
    return {
      message: `${name}, ты уже фармил\n${timeInfo}\nОбщее кол-во опыта - ${profile.xp} XP`,
    };
  }

  const min = -15;
  const max = 25;
  const randomNumber = randomInt(1, max * 2 + Math.abs(min));
  let range = 0;
  let xpOffset = 0;

  for (let i = min; i <= max; i++) {
    if (i === 0) {
      continue;
    }
    range += i < 0 ? 1 : 2;
    if (randomNumber <= range) {
      xpOffset = i;
      break;
    }
  }

  if (profile.xp + xpOffset < 0) {
    xpOffset = -profile.xp;
  }

  const updatedProfile = await db.profile.update({
    where: {
      userId_chatId: { userId: from_id, chatId: peer_id },
    },
    data: {
      xp: {
        increment: xpOffset,
      },
      xpUpdatedAt: new Date(),
    },
    select: {
      xp: true,
    },
  });

  let mainMessage = '';

  if (xpOffset < 0) {
    mainMessage = `прости, но фарм оказался безуспешным\nТы теряешь ${-xpOffset} XP`;
  } else if (xpOffset > 0) {
    mainMessage = `поздравляю, фарм удался\nТы получаешь ${xpOffset} XP`;
  } else {
    mainMessage = `у тебя не получилось ничего нафармить`;
  }

  return {
    message: `${name}, ${mainMessage}\nОбщее кол-во опыта - ${updatedProfile.xp} XP`,
  };
};
