import { BotCommand } from '../../../core';
import { DICK_KRAFT_BOT_ID } from '../../../services/gachi';
import { createVkLink } from '../../../services/vk';

export const getHelp: BotCommand = () => {
  return {
    message: `Команды беляша:
тян - отправляет картинку с тян
кто пидор - выясняет, кто является пидором; имеет ограничение по времени (1 мин.)
беляш статистика - отправляет статистику по чату
беляш трек - отправляет рандомный трек
беляш профиль - отправляет информацию о твоем профиле в чате
беляш покажи роли - отправляет подробную информацию о ролях беляша
беляш помощь - показывает это сообщение

беляш также реагирует на некоторые команды ${createVkLink({
      id: -DICK_KRAFT_BOT_ID,
      name: 'Dick_Kraft_Bot',
    })}:
/писюн - отправляет реакцию на результат
/мой_писюн - визуализирует результат`,
  };
};