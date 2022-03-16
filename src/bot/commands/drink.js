import BotResponse from '../utilities/BotResponse.js';
import { anyElement } from '../utilities/random.js';

const STICKERS = [67104, 51669, 16];

export default async function drink(requestMessage, vkRequest) {
  return new BotResponse({
    sticker_id: anyElement(STICKERS),
  });
}
