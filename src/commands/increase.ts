import { BotCommand } from '../interfaces';
import { randomFrom } from '../utils';
import { sendVkMessage } from '../vk';

const POSSIBLE_RESPONSES = [
  'Как неожиданно и приятно',
  'So fucking deep',
  "Without further interruption, let's celebrate and suck some dick",
  'That turns me on',
  'Boss of this gym',
  "That's amazing",
];

export const increase: BotCommand = body => {
  sendVkMessage({
    peer_id: body.object.message.peer_id,
    message: randomFrom(POSSIBLE_RESPONSES),
  });
};
