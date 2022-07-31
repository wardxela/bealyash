import { BotCommand } from '../interfaces';
import { randomFrom } from '../utils';
import { sendVkMessage } from '../vk';

const POSSIBLE_MESSAGES = [
  'Fuck you',
  'Fucking slave',
  'Another victim',
  'Do you like what you see?',
  'Come on college boy',
  'Ahh, like that?',
];

const POSSIBLE_PHOTOS = [
  'photo-210983855_457239023',
  'photo-210983855_457239024',
  'photo-210983855_457239031',
  'photo-210983855_457239030',
];

export const decrease: BotCommand = body => {
  sendVkMessage({
    peer_id: body.object.message.peer_id,
    message: randomFrom(POSSIBLE_MESSAGES),
    attachment: randomFrom(POSSIBLE_PHOTOS),
  });
};
