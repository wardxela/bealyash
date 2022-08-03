export interface VkWeakSendMessagesRequestParams {
  /** The message which will be sent to the client */
  message: string;

  /** User's/group's id to whom the message will be sent. Defaults to the sender's value */
  peer_id?: number;

  /**
   * A string containing a list of attachments in the following format:
   * `{type}_{owner_id}_{access_key}`
   */
  attachment?: string;
}

export interface VkSendMessagesRequestParams {
  random_id: number;
  peer_id: number;
  message: string;
  attachment?: string;
}
