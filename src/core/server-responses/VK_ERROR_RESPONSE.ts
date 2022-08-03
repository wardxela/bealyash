import { BotServerResponse } from '../interfaces';

export const VK_ERROR_RESPONSE: BotServerResponse = {
  status: 403,
  message: 'Not VK Callback API call',
};
