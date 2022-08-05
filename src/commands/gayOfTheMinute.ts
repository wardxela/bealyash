import { BotAsyncCommand, BotCommandResponse } from '../core';
import { db } from '../services/prisma';
import {
  getConversationMembers,
  VkGetConversationMembersResponse,
} from '../services/vk';
import { randomFrom } from '../utils';

function findMemberById(id: number, members: VkGetConversationMembersResponse) {
  if (id < 0) {
    return members.response.groups.find(group => group.id === -id);
  }
  return members.response.profiles.find(profile => profile.id === id);
}

function memberToString(member: ReturnType<typeof findMemberById>) {
  if (!member) {
    return '[баг|пасхалка]: чел слился из беседы. сами ищите его.';
  }
  if ('first_name' in member) {
    return `[id${member.id}|${member.first_name} ${member.last_name}]`;
  }
  return `[club${member.id}|${member.name}]`;
}

function getDiff(date: Date): number {
  return new Date().getTime() - date.getTime();
}

export const gayOfTheMinute: BotAsyncCommand = async body => {
  const chatId = body.object.message.peer_id;
  const results = await Promise.all([
    getConversationMembers(chatId),
    db.chat.findFirst({
      where: {
        id: chatId,
      },
    }),
  ]);

  const members = results[0];
  let chat = results[1];

  if (!chat) {
    chat = await db.chat.create({
      data: {
        id: chatId,
      },
    });
  }

  const SECOND = 1000;
  const MINUTE = 60;
  let diff = getDiff(chat.updatedAt) / SECOND;
  let gayMemberId: number;
  const hasOneMinutePassed = diff > MINUTE;
  if (hasOneMinutePassed || chat.gay === null) {
    const newGayId = randomFrom(members.response.items).member_id;
    const updatedChat = await db.chat.update({
      where: {
        id: chatId,
      },
      data: {
        gay: newGayId,
      },
    });
    diff = getDiff(updatedChat.updatedAt) / SECOND;
    gayMemberId = newGayId;
  } else {
    gayMemberId = chat.gay;
  }

  const gayMember = memberToString(findMemberById(gayMemberId, members));
  return {
    message: `Пидор - ${gayMember}.\nТебе нужно подождать еще ${
      60 - Math.floor(diff)
    } сек.`,
  };
};
