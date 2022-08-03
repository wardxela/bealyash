import { BotServerResponse } from '../interfaces';

export class BotServerError extends Error {
  public serverResponse: BotServerResponse;

  constructor(response: BotServerResponse, message?: string) {
    super(message);
    this.serverResponse = response;
  }
}
