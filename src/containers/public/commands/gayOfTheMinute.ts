import { BotCommand } from '../../../core';
import { createMap, random } from '../../../utils';
import {
  db,
  findOrCreateChat,
  getBoosterCoefficient,
} from '../../../services/db';
import {
  findMemberById,
  getConversationMembers,
  createVkLink,
} from '../../../services/vk';

function getDiff(date: Date): number {
  return new Date().getTime() - date.getTime();
}

const GAY_COEFFICIENT = 10;
const SECOND = 1000;
const MINUTE = 60;

export const gayOfTheMinute: BotCommand = async event => {
  let gayMemberId: number;
  let diff: number;
  const chatId = event.object.message.peer_id;

  const chatPromise = findOrCreateChat(chatId);
  const membersPromise = getConversationMembers(chatId);
  const profilesPromise = db.profile.findMany({
    where: {
      chat: {
        id: chatId,
      },
    },
    select: {
      userId: true,
      boosterExpirationDate: true,
      booster: {
        select: {
          title: true,
          coefficient: true,
        },
      },
    },
  });
  const [chat, members, profiles] = await Promise.all([
    chatPromise,
    membersPromise,
    profilesPromise,
  ]);

  diff = getDiff(chat.updatedAt) / SECOND;
  const hasOneMinutePassed = diff > MINUTE;

  if (hasOneMinutePassed || chat.gayId === null) {
    let range = 0;
    let newGayId = 0;
    const profilesMap = createMap(profiles, 'userId');
    const gayCoefficientSum = members.response.items.reduce((a, m) => {
      return (
        a + GAY_COEFFICIENT + getBoosterCoefficient(profilesMap[m.member_id])
      );
    }, 0);
    const randomNumber = random(1, gayCoefficientSum);
    for (const member of members.response.items) {
      range +=
        GAY_COEFFICIENT + getBoosterCoefficient(profilesMap[member.member_id]);
      if (randomNumber <= range) {
        newGayId = member.member_id;
        break;
      }
    }
    const updatedChatPromise = db.chat.update({
      where: {
        id: chatId,
      },
      data: {
        gayId: newGayId,
      },
    });
    const updatedProfilePromise = db.profile.upsert({
      where: {
        userId_chatId: {
          userId: newGayId,
          chatId: chatId,
        },
      },
      create: {
        userId: newGayId,
        chat: {
          connect: {
            id: chatId,
          },
        },
        gayCounter: 1,
      },
      update: {
        gayCounter: {
          increment: 1,
        },
      },
    });
    const [updatedChat] = await Promise.all([
      updatedChatPromise,
      updatedProfilePromise,
    ]);
    diff = getDiff(updatedChat.updatedAt) / SECOND;
    gayMemberId = newGayId;
  } else {
    gayMemberId = chat.gayId;
  }
  const gay = findMemberById(gayMemberId, members);
  const name = gay ? createVkLink(gay) : 'ошибка';
  const flooredDiff = Math.floor(diff);

  const hintText = flooredDiff
    ? `\nТебе нужно подождать еще ${60 - flooredDiff} сек. до следующей попытки`
    : '';

  return {
    message: `Пидор - ${name}.${hintText}`,
  };
};
