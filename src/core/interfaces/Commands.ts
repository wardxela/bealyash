import { VkNewMessageEvent } from '../vk';
import { CommandResponse } from './CommandResponse';

export type Command = (body: VkNewMessageEvent) => Promise<CommandResponse>;

export type Commands = Map<RegExp, Command>;
