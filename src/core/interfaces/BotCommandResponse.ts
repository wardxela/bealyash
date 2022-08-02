export interface BotCommandResponse {
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
