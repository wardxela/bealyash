import { BotSettings } from './interfaces';

export const settings: BotSettings = {
  confirmationToken: process.env.CONFIRMATION_STRING!,
  secretKey: process.env.SECRET_KEY!,
  vkApiAccessToken: process.env.VK_API_ACCESS_TOKEN!,
  vkApiVersion: process.env.VK_API_VERSION!,
};
