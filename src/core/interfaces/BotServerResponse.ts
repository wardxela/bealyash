export interface BotServerResponse {
  status: number;
  message: string;
  headers?: Map<string, string | number | readonly string[]>;
}
