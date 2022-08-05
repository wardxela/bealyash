export function getVkMediaURL(
  type: string,
  ownerId: string | number,
  mediaId: string | number,
  accessKey?: string
) {
  return `${type}${ownerId}_${mediaId}${accessKey ? `_${accessKey}` : ''}`;
}

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

export function getVkLink(member: VkUserOrClub) {
  if ('first_name' in member) {
    return `[id${member.id}|${member.first_name} ${member.last_name}]`;
  }
  return `[club${member.id}|${member.name}]`;
}
