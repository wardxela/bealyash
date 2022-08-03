import { VkGetPhotosRequestParams } from '../interfaces';
import { VkGetPhotosResponseSchema } from '../response-schemas';
import { vkAxios } from '../vkAxios';

export async function getPhotos(payload: VkGetPhotosRequestParams) {
  const { data } = await vkAxios('photos.get', payload);
  const photos = VkGetPhotosResponseSchema.parse(data);
  return photos;
}
