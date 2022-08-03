export function getVkMediaURL(
  type: string,
  ownerId: string | number,
  mediaId: string | number,
  accessKey?: string
) {
  return `${type}${ownerId}_${mediaId}${accessKey ? `_${accessKey}` : ''}`;
}
