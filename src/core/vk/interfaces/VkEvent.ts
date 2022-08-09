import { VkAttachment } from './VkAttachment';

export type VkEvent<T extends VkEventType = VkEventType> =
  | VkConfirmationEvent
  | VkGroupEvent<T>;

export type VkEventType = 'message_new';

export interface VkEventObjectMap {
  message_new: VkMessageObject;
}

export interface VkMessageObject {
  message: {
    id: number;
    date: number;
    peer_id: number;
    from_id: number;
    text: string;
    random_id: number;
    important: boolean;
    payload: string;
    attachments: VkAttachment[];
  };
  client_info: any;
}

export interface VkConfirmationEvent {
  type: 'confirmation';
  group_id: number;
  secret: string;
}

export interface VkGroupEvent<T extends VkEventType> {
  type: T;
  event_id: string;
  v: string;
  object: VkEventObjectMap[T];
  group_id: number;
  secret: string;
}
