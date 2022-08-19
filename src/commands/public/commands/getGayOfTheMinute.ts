import { BotCommand } from '../../../core';
import { createMap, getTimeDiff, randomInt, randomFloat } from '../../../utils';
import { db, findOrCreateChat, getBoosterValue } from '../../../services/db';
import {
  findMemberById,
  getConversationMembers,
  COMMUNITY_ID,
  createVkMemberName,
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
      chatId,
      booster: { category: { title: 'Gay' } },
      boosterExpirationDate: { gt: new Date() },
    },
    select: {
      booster: { select: { value: true } },
      userId: true,
    },
  });
  const [chat, members, boosters] = await Promise.all([
    chatPromise,
    membersPromise,
    profilesPromise,
  ]);

  diff = getTimeDiff(chat.updatedAt) / SECOND;
  const hasOneMinutePassed = diff > MINUTE;

  if (hasOneMinutePassed || chat.gayId === null) {
    let newGayId = 0;
    const boostersMap = createMap(boosters, 'userId');
    const totalOutcomes = members.response.items.reduce((a, m) => {
      return a + getBoosterValue(boostersMap[m.member_id]);
    }, 0);
    let range = totalOutcomes;
    const randomNumber = randomFloat(0, totalOutcomes);
    for (const member of members.response.items) {
      range -= getBoosterValue(boostersMap[member.member_id]);
      if (randomNumber >= range) {
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

  const defaultName = createVkMemberName(gay);
  let mainText = '';

  const fromId = Math.abs(event.object.message.from_id);
  const replyFromId = event.object.message.reply_message
    ? Math.abs(event.object.message.reply_message.from_id)
    : undefined;

  const pronoun = match[1].toLowerCase();

  if (/она?/.test(pronoun)) {
    if (replyFromId === gay.id) {
      const title = pronoun === 'она' ? 'лесбиянка' : 'пидор';
      mainText = `Да, ${pronoun} ${title}.`;
    }
  } else if (/(т|в)ы/.test(pronoun)) {
    if (replyFromId !== undefined) {
      if (replyFromId === gay.id) {
        mainText = `Да, он пидор.`;
      }
    } else {
      if (gay.id === -COMMUNITY_ID) {
        mainText = `Да, я пидор.`;
      }
    }
  } else if (/я/.test(pronoun)) {
    if (fromId === gay.id) {
      mainText = `Да, ты пидор.`;
    }
  } else if (/кто/.test(pronoun)) {
    mainText = `Пидор - ${defaultName}`;
  }

  if (!mainText) {
    mainText = `Нет, пидор - ${defaultName}`;
  }

  return {
    message: `${mainText}${hintText}`,
  };
};
