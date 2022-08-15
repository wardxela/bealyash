import 'dotenv/config';
import { createBot } from './core';
import { config } from './config';
import {
  getAllBoosts,
  getAllRoles,
  getAudio,
  getChan,
  getChatStatistics,
  getGayOfTheMinute,
  getGayProbabilities,
  getHelp,
  getProfile,
  onlyUsers,
  useBoost,
} from './containers/public';
import {
  createRole,
  deleteRole,
  giveRole,
  onlyAdmin,
  updateRole,
} from './containers/private';
import { changeSize, onlyDickKraft, showSize } from './containers/dick-kraft';
import { addAudio, onlyContentMakers } from './containers/content-maker';

const bot = createBot(config);

// Guards
bot.protect(/.*/, onlyUsers);

// Main
bot.set(/(кто пидо?р|пид(о?р|рила) кто)/i, getGayOfTheMinute);
bot.set(/беляш (трек|музыка|микс|музло)/i, getAudio);
bot.set(/беляш (буст|баф)/i, useBoost);
bot.set(/тян/i, getChan);

// Statistics
bot.set(/беляш стат(истика|а)?/i, getChatStatistics);
bot.set(/беляш вероятности/i, getGayProbabilities);
bot.set(/беляш профиль/i, getProfile);

// Documentation
bot.set(/беляш (помощь|х(э|е)лп|дока|инфа|help)/i, getHelp);
bot.set(/беляш все (бусты|бафф?ы)/i, getAllBoosts);
bot.set(/беляш все роли/i, getAllRoles);

// Dick_Kraft_Bot
bot.group(builder => {
  builder.protect(/.*/, onlyDickKraft);
  builder.set(/твій пісюн (зменшився|виріс)/, changeSize);
  builder.set(/довжина твого писюна \d+ см/, showSize);
});

// Private
bot.group(builder => {
  builder
    .protect(/.*/, onlyAdmin)
    .set(/^беляш дай роль ([а-яА-Я-_]+)$/i, giveRole)
    .set(/^беляш создай роль/i, createRole)
    .set(/^беляш обнови роль/i, updateRole)
    .set(/^беляш удали роль/i, deleteRole);
});

// Content maker
bot.group(builder => {
  builder.protect(/.*/, onlyContentMakers).set(/беляш добавь трек/i, addAudio);
});
