import * as R from 'rambda';
import { BotCommand } from '../../../core';
import { db } from '../../../services/db';
import { createVkMemberName, getUsersOrGroups } from '../../../services/vk';
import { ruNumberToString } from '../../../utils';

const MEDALS = ['&#129351;', '&#129352;', '&#129353;'];

export const getTopGays: BotCommand = async () => {
  const profiles = await db.profile.findMany({
    take: 3,
    orderBy: { gayCounter: 'desc' },
    select: { userId: true, gayCounter: true },
  });
  const members = await getUsersOrGroups(R.pluck('userId', profiles));

  return {
    message: profiles.reduce(
      (a, p, i) =>
        `${a}\n${MEDALS[i]} ${createVkMemberName(
          members[i]
        )} - ${ruNumberToString(p.gayCounter)}`,
      'Топ пидоров беляша:'
    ),
  };
};
