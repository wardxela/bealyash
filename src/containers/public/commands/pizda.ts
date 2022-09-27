import { BotCommand } from '../../../core';
import { createVkMediaURL } from '../../../services/vk';

export const pizda: BotCommand = () => {
  return {
    attachment: createVkMediaURL('photo', -210983855, 457239600),
  };
};
