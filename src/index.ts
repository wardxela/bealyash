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
  getKun,
  getTopGays,
  yes,
  no,
  echo,
  getGreatQuote,
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
  addQuote,
  onlyContentMakers,
} from './containers/content-maker';

const bot = createBot(config);

// Public
bot.set(/(кто|я|ты|вы|она?) пидо?р/i, getGayOfTheMinute);
bot.set(/тян/i, getChan);
bot.set(/(куны?)( \d+)?/i, getKun);
bot.set(/б(еляш)? (трек|музыка|микс|музло)/i, getAudio);
bot.set(/б(еляш)? буст/i, useBoost);
bot.set(/б(еляш)? фарм/i, getXP);
bot.set(/б(еляш)? пикча( \d+)?/i, getGirlPicture);
bot.set(/б(еляш)? топ/i, getTopGays);
bot.set(/^да$/i, yes);
bot.set(/^нет$/i, no);
bot.set(/б(еляш)? эхо/i, echo);
bot.set(/^вцк$/i, getGreatQuote);

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
    .set(/^б(еляш)? добавь (куна|кунов)/i, addKun)
    .set(/^б(еляш)? добавь трек/i, addAudio)
    .set(/вцк добавь/i, addQuote);
});
