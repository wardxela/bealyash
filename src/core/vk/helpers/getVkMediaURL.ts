export function getVkMediaURL(
  type: string,
  ownerId: string | number,
  mediaId: string | number
) {
  return `${type}${ownerId}_${mediaId}`;
}
