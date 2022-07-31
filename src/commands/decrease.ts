import { BotCommand } from '../interfaces';
import { randomFrom } from '../utils';
import { sendVkMessage } from '../vk';

const POSSIBLE_RESPONSES = [
  'Fuck you',
  'Fucking slave',
  'Another victim',
  'Do you like what you see?',
  'Come on college boy',
  'Ahh, like that?',
];

export const decrease: BotCommand = body => {
  sendVkMessage({
    peer_id: body.object.message.peer_id,
    message: randomFrom(POSSIBLE_RESPONSES),
  });
};
