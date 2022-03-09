// actions
import newMessage from './actions/newMessage.js';

// types
import { NEW_MESSAGE } from '../vk/types.js';

export default async function bot(vkRequest) {
  switch (vkRequest.type) {
    case NEW_MESSAGE:
      return await newMessage(vkRequest);
    default:
      return;
  }
}
