import { VkMessageBody } from '../vk';

export type BotCommand = (body: VkMessageBody) => any;
