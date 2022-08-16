import { BotConfig } from './core';

export const config: BotConfig = {
  port: +process.env.PORT! || 80,
  confirmationString: process.env.CONFIRMATION_STRING!,
  vkApiVersion: process.env.VK_API_VERSION!,
  serverVkApiAccessToken: process.env.CHAT_BOT_VK_API_ACCESS_TOKEN!,
  uncaughtCommandErrorResponse: {
    message:
      'Прости, но я немного заглох.\nОбещаю в ближайшее время заработать',
  },
};
