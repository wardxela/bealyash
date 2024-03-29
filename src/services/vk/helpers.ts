import { VkGetConversationMembersResponseSchema } from './response-schemas';

interface VkUser {
  id: number;
  first_name: string;
  last_name: string;
}

interface VkClub {
  id: number;
  name: string;
}

type VkUserOrClub = VkUser | VkClub;

export function createVkMediaURL(
  type: string,
  ownerId: string | number,
  mediaId: string | number,
  accessKey?: string | null
) {
  return `${type}${ownerId}_${mediaId}${accessKey ? `_${accessKey}` : ''}`;
}

export function createVkMemberLink(member: VkUserOrClub, customText?: string) {
  if ('first_name' in member) {
    return `[id${member.id}|${
      customText ? customText : `${member.first_name} ${member.last_name}`
    }]`;
  }
  return `[club${member.id}|${customText ? customText : member.name}]`;
}

export function createVkMemberName(member: VkUserOrClub) {
  if ('first_name' in member) {
    return `${member.first_name} ${member.last_name}`;
  }
  return member.name;
}

export function findMemberById(
  id: number,
  members: VkGetConversationMembersResponseSchema
) {
  if (id < 0) {
    return members.response.groups.find(group => group.id === -id);
  }
  return members.response.profiles.find(profile => profile.id === id);
}
