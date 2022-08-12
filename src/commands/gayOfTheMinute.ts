import { Chat } from '@prisma/client';
import { BotCommand } from '../core';
import { db } from '../services/prisma';
import {
  findMemberById,
  getConversationMembers,
  createVkLink,
} from '../services/vk';
import { randomFrom } from '../utils';

function getDiff(date: Date): number {
  return new Date().getTime() - date.getTime();
}

const SECOND = 1000;
const MINUTE = 60;

export const gayOfTheMinute: BotCommand = async event => {
  let chat: Chat;
  let gayMemberId: number;
  let diff: number;
  const chatId = event.object.message.peer_id;

  const membersPromise = getConversationMembers(chatId);
  const chatPromise = db.chat.findUnique({
    where: {
      id: chatId,
    },
  });
  const [members, chatOrNull] = await Promise.all([
    membersPromise,
    chatPromise,
  ]);

  if (!chatOrNull) {
    chat = await db.chat.create({
      data: {
        id: chatId,
      },
    });
  } else {
    chat = chatOrNull;
  }

  diff = getDiff(chat.updatedAt) / SECOND;
  const hasOneMinutePassed = diff > MINUTE;

  if (hasOneMinutePassed || chat.gayId === null) {
    const newGayId = randomFrom(members.response.items).member_id;
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
