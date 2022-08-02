import { CommandResponse } from '../interfaces';

export class CommandError extends Error {
  public commandResponse: CommandResponse;

  constructor(response: CommandResponse, message?: string) {
    super(message);
    this.commandResponse = response;
  }
}
