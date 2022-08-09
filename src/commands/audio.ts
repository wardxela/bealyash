import { BotSyncCommand } from '../core';
import { randomFrom } from '../utils';

const PLAYLIST = [
  'audio-210983855_456239018_d138f8752b6da7d7d7',
  'audio-210983855_456239022_92824d0fb66869bdc0',
  'audio-210983855_456239021_3070e4e6e18537c22c',
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
