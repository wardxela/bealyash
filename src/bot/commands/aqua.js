import BotResponse from '../utilities/BotResponse.js';

export default async function aqua(requestMessage, vkRequest) {
  return new BotResponse({
    message: 'Держи, дружище',
    attachment: 'video442006482_456239237%2Fvideos-210983855',
  });
}
