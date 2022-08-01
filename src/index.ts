import 'dotenv/config';
import { createBot } from './core/createBot';

const bot = createBot();
bot.listen(process.env.PORT || 80);
