export type VkAttachmentType = 'audio' | 'photo' | 'video';
export type VkAttachment<T extends VkAttachmentType = VkAttachmentType> =
  VkAttachmentMap[T];

export interface VkAttachmentMap {
  audio: VkAudioAttachment;
  photo: VkPhotoAttachment;
  video: VkVideoAttachment;
}

export interface VkAudioAttachment {
  type: 'audio';
  audio: {
    id: number;
    owner_id: number;
    title: string;
    access_key?: string;
    artist: string;
    duration: number;
    url: string;
  };
}
export interface VkPhotoAttachment {
  type: 'photo';
  photo: {
    id: number;
    album_id: number;
    owner_id: number;
    user_id: number;
    text: string;
    access_key?: string;
  };
}
export interface VkVideoAttachment {
  type: 'video';
  video: {
    id: number;
    owner_id: number;
    title: string;
    description: string;
    duration: number;
    access_key?: string;
  };
}
