import { NEW_MESSAGE } from '../vk/types.js';
import { isCallToBot } from './utilities/regexp.js';
import dispatcher from './dispatcher.js';

export default function bot(data, end) {
  if (data.type !== NEW_MESSAGE) {
    return end(400, 'Not Callback API call');
  }

  if (isCallToBot(data.object.message.text)) {
    return dispatcher(data, () => {
      return end(200, 'ok');
    });
  }

  return end(200, 'ok');
}
