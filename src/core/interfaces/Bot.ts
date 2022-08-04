import { Server } from 'http';
import { BotAsyncCommand, BotSyncCommand } from './BotCommand';

export interface Bot {
  listen(port: number): Server;
  set(pattern: RegExp, command: BotSyncCommand): void;
  set(pattern: RegExp, command: BotAsyncCommand): void;
}
