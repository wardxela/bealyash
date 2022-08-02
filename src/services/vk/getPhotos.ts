import {
  vkAxios,
  VkGetPhotosRequestParams,
  VkGetPhotosResponseSchema,
} from '../../core';

export async function getPhotos(payload: VkGetPhotosRequestParams) {
  const { data } = await vkAxios('photos.get', payload);
  const photos = VkGetPhotosResponseSchema.parse(data);
  return photos;
}
