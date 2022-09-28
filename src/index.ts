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
  getProbabilities,
  getHelp,
  getProfile,
  onlyUsers,
  useBoost,
  getXP,
  getBoostersRarities,
  getGirlPicture,
  pizda,
  getKun,
} from './containers/public';
import {
  createRole,
  deleteRole,
  giveRole,
  onlyAdmin,
  updateRole,
} from './containers/private';
import { changeSize, onlyDickKraft, showSize } from './containers/dick-kraft';
import {
  addAudio,
  addKun,
  onlyContentMakers,
} from './containers/content-maker';

const bot = createBot(config);

// Public
bot.set(/(кто|я|ты|вы|она?) пидо?р/i, getGayOfTheMinute);
bot.set(/тян/i, getChan);
bot.set(/кун/i, getKun);
bot.set(/б(еляш)? (трек|музыка|микс|музло)/i, getAudio);
bot.set(/б(еляш)? буст/i, useBoost);
bot.set(/б(еляш)? фарм/i, getXP);
bot.set(/б(еляш)? пикча( \d+)?/i, getGirlPicture);
bot.set(/^да/i, pizda);

// Users
bot.group(builder => {
  // Guards
  builder.protect(/.*/, onlyUsers);

  // Documentation
  builder
    .set(/б(еляш)? (помощь|х(э|е)лп|дока|инфа|help)/i, getHelp)
    .set(/б(еляш)? все бусты/i, getAllBoosts)
    .set(/б(еляш)? все роли/i, getAllRoles);

  // Statistics
  builder
    .set(/б(еляш)? чат/i, getChatStatistics)
    .set(/б(еляш)? профиль/i, getProfile)
    .set(/б(еляш)? шансы? (опидорения)/i, getProbabilities)
    .set(/б(еляш)? редкости бустов/i, getBoostersRarities);
});

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
    .set(/^б(еляш)? дай роль ([а-яА-Я-_]+)$/i, giveRole)
    .set(/^б(еляш)? создай роль/i, createRole)
    .set(/^б(еляш)? обнови роль/i, updateRole)
    .set(/^б(еляш)? удали роль/i, deleteRole);
});

// Content maker
bot.group(builder => {
  builder
    .protect(/.*/, onlyContentMakers)
    .set(/^б(еляш)? добавь куна/i, addKun)
    .set(/^б(еляш)? добавь трек/i, addAudio);
});
