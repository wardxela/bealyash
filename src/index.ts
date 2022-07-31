import 'dotenv/config';
import { createBot } from './createBot';

const bot = createBot();
bot.listen(process.env.PORT || 80);
