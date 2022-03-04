import { NEW_MESSAGE } from '../vk/types.js';
import { isCallToBot } from './utilities/regexp.js';
import dispatcher from './dispatcher.js';

export default function bot(data, end) {
  if (data.type === NEW_MESSAGE && isCallToBot(data.object.message.text)) {
    return dispatcher(data, end);
  }

  return end();
}
