import { Server } from 'http';
import { BotAsyncCommand, BotSyncCommand } from './BotCommand';

export interface Bot {
  listen(port: number): Server;
  add(pattern: RegExp, command: BotSyncCommand): void;
  add(pattern: RegExp, command: BotAsyncCommand): void;
}
