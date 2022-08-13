import { BotCommandResponse } from './BotCommand';

export interface BotConfig {
  port: number;

  /**
   * Special secret key that will be returned on `confirmation` event
   */
  confirmationString: string;

  /**
   * Vk API version that will be used to send messages
   */
  vkApiVersion: string | number;

  /**
   * Access token to VK API that will be used to send messages
   */
  serverVkApiAccessToken: string;

  /**
   * Response to be returned as a message to the chat in case of an error
   */
  uncaughtCommandErrorResponse?: BotCommandResponse;

  /**
   * The shortest time during which the server will wait for a response from the commands.
   * If no response will be returned during that time, server throws a `BotServerTimeoutError` error.
   * @defaultValue 15000
   */
  timeout?: number;
}
