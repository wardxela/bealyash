import { VkMethod } from './VkMethod';

export interface VkResponseMap {
  'photos.get': VkGetPhotosResponse;
  'photos.getMessagesUploadServer': VkGetMessagesUploadServerResponse;
  'messages.send': VkSendMessagesResponse;
  'photos.saveMessagesPhoto': VkSaveMessagesPhotoResponse;
}

export type VkResponse<M extends VkMethod> = VkResponseMap[M];

export interface VkPhoto {
  owner_id: number;
  id: number;
}

export interface VkGetPhotosResponse {
  response: {
    count: number;
    items: VkPhoto[];
  };
}

export interface VkGetMessagesUploadServerResponse {
  response: {
    upload_url: string;
    album_id: number;
    user_id: number;
    group_id: number;
  };
}

export interface VkSendMessagesResponse {
  [key: string]: any;
}

export interface VkSaveMessagesPhotoResponse {
  response: {
    id: number;
    owner_id: number;
    access_key: string;
  }[];
}
