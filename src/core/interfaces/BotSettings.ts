export interface BotSettings {
  /** Confirmation token which must me sent on `confirmation` request */
  confirmationToken: string;

  /** Secret key which is used in order to authenticate request to the bot */
  secretKey: string;

  vkApiAccessToken: string;

  vkApiVersion: string;
}
