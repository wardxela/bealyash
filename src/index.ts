import 'dotenv/config';
import { createBot } from './core';
import { config } from './config';
import {
  getChan,
  gayOfTheMinute,
  getStatistics,
  getAudio,
  addAudio,
  onlyUsers,
  getProfile,
  getAllRoles,
} from './containers/public';
import { changeSize, onlyDickKraft, showSize } from './containers/dick-kraft';
import { createRole, giveRole, onlyAdmin } from './containers/private';

const bot = createBot(config);

// Guards
bot.protect(/.*/, onlyUsers);

// Commands
bot.set(/тян/i, getChan);
bot.set(/(кто пидо?р|пид(о?р|рила) кто)/i, gayOfTheMinute);
bot.set(/беляш стат(истика|а)?/i, getStatistics);
bot.set(/беляш (трек|музыка|микс|музло)/i, getAudio);
bot.set(/беляш добавь/i, addAudio);
bot.set(/беляш профиль/i, getProfile);
bot.set(/беляш роли/i, getAllRoles);

// Dick_Kraft_Bot
bot.group(builder => {
  builder.protect(/.*/, onlyDickKraft);
  builder.set(/твій пісюн (зменшився|виріс)/, changeSize);
  builder.set(/довжина твого писюна \d+ см/, showSize);
});

// Private
bot.group(builder => {
  builder.protect(/.*/, onlyAdmin);
  builder.set(/^беляш дай роль ([а-яА-Я]+)$/i, giveRole);
  builder.set(/^беляш создай роль ([а-яА-Я]+) ([а-яА-Я\s]+)$/i, createRole);
});
