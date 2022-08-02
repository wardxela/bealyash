export type VkEvent = VkConfirmationEvent | VkNewMessageEvent;

export interface VkConfirmationEvent {
  type: 'confirmation';
  group_id: number;
  secret: string;
}

export interface VkNewMessageEvent {
  type: 'message_new';
  group_id: number;
  v: string;
  secret: string;
  object: {
    message: {
      date: number;
      from_id: number;
      peer_id: number;
      text: string;
    };
  };
}
