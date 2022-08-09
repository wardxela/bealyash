import { BotSyncCommand } from '../core';
import { randomFrom } from '../utils';

const PLAYLIST = [
  'audio-2001213935_80213935',
  'audio-210983855_456239022_92824d0fb66869bdc0',
  'audio-2001621785_83621785',
  'audio-210983855_456239020_4d1819a2db4a67b06d',
  'audio-210983855_456239019_1681f9bedd15ca1414',
  'audio-210983855_456239017_fd20f44b06395534f3',
];

export const audio: BotSyncCommand = () => {
  return {
    message: '',
    attachment: randomFrom(PLAYLIST),
  };
};
