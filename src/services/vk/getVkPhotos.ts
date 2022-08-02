import { vkAxios, VkGetPhotosRequest } from '../../core';

export async function getVkPhotos(payload: VkGetPhotosRequest) {
  const response = await vkAxios('photos.get', payload);
}
