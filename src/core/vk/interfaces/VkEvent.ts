export type VkEvent = VkConfirmationEvent | VkNewMessageEvent;

export interface VkConfirmationEvent {
  type: 'confirmation';
  group_id: number;
  secret: string;
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
  };
  client_info: any;
}

export interface VkNewMessageEvent {
  type: 'message_new';
  group_id: number;
  v: string;
  secret: string;
  object: VkMessageObject;
}
