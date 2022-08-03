import { BotCommandResponse } from './BotCommandResponse';

export interface BotConfig {
  /**
   * Response to be returned as a message to the chat in case of an error
   */
  badCommandResponse?: BotCommandResponse;
}
