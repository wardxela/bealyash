import { vkAxios, VkGetPhotosRequestParams } from '../../core';

export async function getVkPhotos(payload: VkGetPhotosRequestParams) {
  const response = await vkAxios('photos.get', payload);
}
