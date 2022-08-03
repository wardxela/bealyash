import { BotCommandResponse } from './BotCommandResponse';

export interface BotConfig {
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
  uncaughtErrorResponse?: BotCommandResponse;

  /**
   * Response to be returned as a message to the chat in case of timeout error
   */
  timeoutErrorResponse?: BotCommandResponse;
}
