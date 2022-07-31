import { settings } from '../settings';

export function auth() {
  return {
    status: 200,
    message: settings.confirmationToken,
  };
}
