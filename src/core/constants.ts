import { BotServerResponse, BotVerifiedCommandResponse } from './interfaces';

export const DEFAULT_SERVER_TIMEOUT = 15000;

export const INTERNAL_SERVER_ERROR_RESPONSE: BotServerResponse = {
  status: 500,
  message: 'Internal server error',
};

export const OK_SERVER_RESPONSE: BotServerResponse = {
  status: 200,
  message: 'ok',
};

export const DEFAULT_UNCAUGHT_COMMAND_ERROR_RESPONSE: BotVerifiedCommandResponse =
  {
    message: 'error',
  };
