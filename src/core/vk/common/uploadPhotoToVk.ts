import axios from 'axios';
import FormData from 'form-data';
import { Readable } from 'stream';
import { isVkErrorResponse } from '../predicates';
import { vkAxios } from '../vkAxios';

export interface UploadServerResponse {
  server: number;
  photo: string;
  hash: string;
}

export async function uploadPhotoToVk(peer_id: number, file: Readable) {
  const { data: uploadServer } = await vkAxios(
    'photos.getMessagesUploadServer',
    { peer_id },
    false
  );

  if (isVkErrorResponse(uploadServer)) {
    return uploadServer;
  }

  const form = new FormData();
  form.append('photo', file);

  const { data: uploadedPhoto } = await axios.post<UploadServerResponse>(
    uploadServer.response.upload_url,
    form,
    {
      headers: form.getHeaders(),
    }
  );

  return (await vkAxios('photos.saveMessagesPhoto', uploadedPhoto, false)).data;
}
