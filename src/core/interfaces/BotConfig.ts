import { BotCommandResponse } from './BotCommandResponse';

export interface BotConfig {
  /**
   * Response to be returned as a message to the chat in case of an error
   */
  badCommandResponse?: BotCommandResponse;

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
}
