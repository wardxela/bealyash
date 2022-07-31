import { BotSettings } from '.';

export const settings: BotSettings = {
  confirmationToken: process.env.CONFIRMATION_STRING!,
  secretKey: process.env.SECRET_KEY!,
  vkApiAccessToken:
    process.env.VK_API_ACCESS_TOKEN! ||
    'vk1.a.fcT_KAjdEDfX3ELnjBOqTfhMjQESSLOYiEVd3mRNKK3wnjZaMBKoWSjIcpb6o4RZBeF0gZB2BC119022grMyqSG3uRXpc8a8Zbjjz7Q9fjrXsBooTIa8teBeyMTw6EQG23pXX9Of4lJvsuKLnzI6cE7Vo1DfD6SSs2hIy1kcob3ws4rmyZkEqXcbsgJ-ms6Z',
  vkApiVersion: process.env.VK_API_VERSION! || '5.131',
};
