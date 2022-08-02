import { BotResponse } from '../interfaces';

export class BotError extends Error {
  public botResponse: BotResponse;

  constructor(response: BotResponse, message?: string) {
    super(message);
    this.botResponse = response;
  }
}
