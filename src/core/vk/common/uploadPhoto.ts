import axios from 'axios';
import FormData from 'form-data';
import { Readable } from 'stream';
import {
  UploadServerResponseSchema,
  VkGetMessagesUploadServerResponseSchema,
  VkSaveMessagesPhotoResponseSchema,
} from '../response-schemas';
import { vkAxios } from '../vkAxios';

export async function uploadPhoto(peer_id: number, file: Readable) {
  const { data } = await vkAxios(
    'photos.getMessagesUploadServer',
    { peer_id },
    false
  );
  const uploadServer = VkGetMessagesUploadServerResponseSchema.parse(data);

  const form = new FormData();
  form.append('photo', file);

  const { data: data2 } = await axios.post(
    uploadServer.response.upload_url,
    form,
    {
      headers: form.getHeaders(),
    }
  );

  const photoMetadata = UploadServerResponseSchema.parse(data2);

  const { data: data3 } = await vkAxios(
    'photos.saveMessagesPhoto',
    photoMetadata,
    false
  );

  const photos = VkSaveMessagesPhotoResponseSchema.parse(data3);

  return photos;
}
