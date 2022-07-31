export type VkBodyType = 'confirmation' | 'message_new';

export type VkBody = VkConfirmationBody | VkMessageBody;

export interface VkConfirmationBody {
  type: 'confirmation';
  group_id: number;
  secret: string;
}

export interface VkMessageBody {
  type: 'message_new';
  group_id: number;
  event_id: string;
  v: string;
  secret: string;
  object: {
    date: number;
    from_id: number;
    peer_id: number;
    text: string;
  };
}
