import { VkMessageBody } from '../vk';

export interface BotCommandResponse {
  /** The message which will be sent to the client */
  message: string;

  /** User's/group's id to whom the message will be sent. Defaults to the sender's value */
  peer_id?: number;

  attachment?: string;
}

export type BotCommand = (
  body: VkMessageBody
) => Promise<BotCommandResponse> | BotCommandResponse;

export type BotCommands = Map<RegExp, BotCommand>;
