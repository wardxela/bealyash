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
  accessKey?: string
) {
  return `${type}${ownerId}_${mediaId}${accessKey ? `_${accessKey}` : ''}`;
}

export function createVkLink(member: VkUserOrClub) {
  if ('first_name' in member) {
    return `[id${member.id}|${member.first_name} ${member.last_name}]`;
  }
  return `[club${member.id}|${member.name}]`;
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
