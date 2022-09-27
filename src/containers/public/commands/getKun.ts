import { BotCommand } from '../../../core';
import { createVkMediaURL } from '../../../services/vk';
import { randomFrom } from '../../../utils';

export const getKun: BotCommand = () => {
  return {
    message: randomFrom(['Держи опасного', 'Держи куна', 'Держи красавчика']),
    attachment: 'photo-210983855_457239601',
  };
};
