import { Server } from 'http';
import { BotCommand } from './BotCommand';
import { BotGuard } from './BotGuards';
import { Pattern } from './Pattern';

export interface Bot {
  listen(port: number): Server;
  set(pattern: Pattern, command: BotCommand): void;
  protect(pattern: Pattern, guard: BotGuard): void;
}
