export interface VkSendMessagesRequestParamsWithMessage {
  message: string;
  attachment?: string;
}

export interface VkSendMessagesRequestParamsWithAttachment {
  message?: string;
  attachment: string;
}

export interface VkWeakSendMessagesRequestParamsBase {
  peer_id?: number;
}

export interface VkSendMessagesRequestParamsBase {
  random_id: number;
  peer_id: number;
}

export type VkWeakSendMessagesRequestParams =
  VkWeakSendMessagesRequestParamsBase &
    (
      | VkSendMessagesRequestParamsWithMessage
      | VkSendMessagesRequestParamsWithAttachment
    );

export type VkSendMessagesRequestParams = VkSendMessagesRequestParamsBase &
  (
    | VkSendMessagesRequestParamsWithMessage
    | VkSendMessagesRequestParamsWithAttachment
  );
