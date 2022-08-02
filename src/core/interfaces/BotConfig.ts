import { CommandResponse } from './CommandResponse';
import { BotResponse } from './BotResponse';

export interface BotConfig {
  /**
   * Response to be returned as a message to the chat in case of an error
   */
  badResponse?: CommandResponse;
}
