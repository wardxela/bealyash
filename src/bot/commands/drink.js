import BotResponse from '../utilities/BotResponse.js';

export default async function drink(requestMessage, vkRequest) {
    return new BotResponse({
        sticker_id: 10604
    });
}