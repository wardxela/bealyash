import { BotCommand } from '../../../core';
import { createMap, getTimeDiff, random } from '../../../utils';
import {
  db,
  findOrCreateChat,
  GAY_COEFFICIENT,
  getBoosterCoefficient,
} from '../../../services/db';
import {
  findMemberById,
  getConversationMembers,
  createVkLink,
  COMMUNITY_ID,
} from '../../../services/vk';

const SECOND = 1000;
const MINUTE = 60;

export const getGayOfTheMinute: BotCommand = async (event, match) => {
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

  diff = getTimeDiff(chat.updatedAt) / SECOND;
  const hasOneMinutePassed = diff > MINUTE;

  if (hasOneMinutePassed || chat.gayId === null) {
    let range = 0;
    let newGayId = 0;
    const profilesMap = createMap(profiles, 'userId');
    const totalOutcomes = members.response.items.reduce((a, m) => {
      return (
        a + GAY_COEFFICIENT + getBoosterCoefficient(profilesMap[m.member_id])
      );
    }, 0);
    const randomNumber = random(1, totalOutcomes);
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
    diff = getTimeDiff(updatedChat.updatedAt) / SECOND;
    gayMemberId = newGayId;
  } else {
    gayMemberId = chat.gayId;
  }
  const gay = findMemberById(gayMemberId, members);
  if (!gay) {
    return {
      message: `Пидор смылся из беседы`,
    };
  }
  const flooredDiff = Math.floor(diff);

  const hintText = flooredDiff
    ? `\nТебе нужно подождать еще ${60 - flooredDiff} сек. до следующей попытки`
    : '';

  let mainText = 'Пидор - ';
  const defaultName = createVkLink(gay);

  if (/она?/i.test(match[1])) {
    if (event.object.message.reply_message?.from_id === gay.id) {
      const title = match[1] === 'она' ? 'лесбиянка' : 'пидор';
      mainText = `Да, ${createVkLink(gay, match[1])} ${title}`;
    } else {
      mainText = `Нет, пидор - ${defaultName}`;
    }
  } else if (/(т|в)ы/i.test(match[1])) {
    if (event.object.message.reply_message?.from_id === gay.id) {
      mainText = `Да, ${createVkLink(gay, 'он')} пидор`;
    } else if (gay.id === -COMMUNITY_ID) {
      mainText = `Да, ${createVkLink(gay, 'я')} пидор`;
    } else {
      mainText = `Нет, пидор - ${defaultName}`;
    }
  } else if (/я/i.test(match[1])) {
    if (event.object.message.from_id === gay.id) {
      mainText = `Да, ${createVkLink(gay, 'ты')} пидор`;
    } else {
      mainText = `Нет, пидор - ${defaultName}`;
    }
  }

  return {
    message: `${mainText} .${hintText}`,
  };
};
