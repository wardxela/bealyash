import { BotResponse } from '../interfaces';

export class BotError extends Error {
  public response: BotResponse;

  constructor(response: BotResponse, message?: string) {
    super(message);
    this.response = response;
  }
}
