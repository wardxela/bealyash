import { VkMethod } from './VkMethod';

export interface VkRequestParamsMap {
  'messages.send': VkSendMessagesRequestParams;
  'photos.get': VkGetPhotosRequestParams;
  'photos.getMessagesUploadServer': VkGetMessagesUploadServerRequestParams;
  'photos.saveMessagesPhoto': VKSaveMessagesPhotoRequestParams;
}

export type VkRequestParams<M extends VkMethod> = VkRequestParamsMap[M];

export interface VkWeakSendMessagesRequestParams {
  /** The message which will be sent to the client */
  message: string;

  /** User's/group's id to whom the message will be sent. Defaults to the sender's value */
  peer_id?: number;

  /**
   * A string containing a list of attachments in the following format:
   * `{type}_{owner_id}_{access_key}`
   *
   * You can use `getVkMediaURL` function in combination with `String.prototype.join` method to create such string on the fly
   */
  attachment?: string;
}

export interface VkSendMessagesRequestParams {
  random_id: number;
  peer_id: number;
  message: string;
  attachment?: string;
}

export interface VkGetPhotosRequestParams {
  owner_id: number;
  album_id: number;
}

export interface VkGetMessagesUploadServerRequestParams {
  peer_id: number;
}

export interface VKSaveMessagesPhotoRequestParams {
  photo: string;
  server: number;
  hash: string;
}
