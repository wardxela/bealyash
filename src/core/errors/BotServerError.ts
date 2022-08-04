import { BotServerResponse } from '../interfaces';

export class BotServerError extends Error {
  public serverResponse: BotServerResponse;

  constructor(response: BotServerResponse) {
    super();
    this.serverResponse = response;
  }
}
