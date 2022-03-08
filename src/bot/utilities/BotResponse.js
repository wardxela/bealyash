import { MAX_LENGTH } from '../../config.js';

function capitalize(str) {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export default class BotResponse {
  constructor(params) {
    for (const key in params) {
      this[key] = params[key];
      this[`filter${capitalize(key)}`](key);
    }
  }

  filterMessage(key) {
    if (this[key].length > MAX_LENGTH) {
      this[key] = this[key].slice(0, MAX_LENGTH);
    }
  }
  filterAttachment() {}
}
