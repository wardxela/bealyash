// actions
import newMessage from './actions/newMessage.js';

// types
import { NEW_MESSAGE } from '../vk/types.js';

export default function bot(data, end) {
  switch (data.type) {
    case NEW_MESSAGE:
      return newMessage(data, end);
    default:
      return end();
  }
}
