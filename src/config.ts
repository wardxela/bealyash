import { BotConfig } from './core';

export const config: BotConfig = {
  confirmationString: process.env.CONFIRMATION_STRING!,
  vkApiVersion: process.env.VK_API_VERSION!,
  serverVkApiAccessToken: process.env.CHAT_BOT_VK_API_ACCESS_TOKEN!,
  uncaughtCommandErrorResponse: {
    message:
      'Прости, но я немного бум бум.\nОбещаю в ближайшее время заработать',
  },
};

export const PORT = +process.env.PORT! || 80;
