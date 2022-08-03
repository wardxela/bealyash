import axios from 'axios';
import FormData from 'form-data';
import { prepareVkSendMessagesRequestParams } from './helpers';
import { VkSendMessage, VkSendMessagesRequestParams } from './interfaces';

interface SendMessageConfig {
  accessToken: string;
  apiVersion: string | number;
}

export async function internalSendMessage(
  params: VkSendMessagesRequestParams,
  config: SendMessageConfig
) {
  const form = new FormData();
  const { accessToken, apiVersion } = config;

  form.append('v', apiVersion);
  form.append('access_token', accessToken);

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) {
      continue;
    }

    form.append(key, value);
  }

  return axios.post(`https://api.vk.com/method/messages.send`, form);
}

export function createSendMessage(config: SendMessageConfig): VkSendMessage {
  return async (weakParams, messageEvent) => {
    const params = prepareVkSendMessagesRequestParams(
      weakParams,
      messageEvent.object
    );
    return internalSendMessage(params, config);
  };
}
