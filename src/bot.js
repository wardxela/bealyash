import { CONFIRMATION_STRING } from './config.js';

export default function handler(data) {
  const response = {
    title: 'Hello world',
  };

  if (data.type === 'confirmation') {
    return CONFIRMATION_STRING;
  }

  return JSON.stringify(response);
}
