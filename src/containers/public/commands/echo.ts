import { BotCommand } from '../../../core';
import { createVkMediaURL } from '../../../services/vk';

export const echo: BotCommand = (event, match) => {
  return {
    message: event.object.message.text.replace(match[0], '').trim(),
    attachment: event.object.message.attachments
      .map(attachment => {
        switch (attachment.type) {
          case 'audio':
            return createVkMediaURL(
              attachment.type,
              attachment.audio.owner_id,
              attachment.audio.id,
              attachment.audio.access_key
            );
          case 'photo':
            return createVkMediaURL(
              attachment.type,
              attachment.photo.owner_id,
              attachment.photo.id,
              attachment.photo.access_key
            );
          case 'video':
            return createVkMediaURL(
              attachment.type,
              attachment.video.owner_id,
              attachment.video.id,
              attachment.video.access_key
            );
          default:
            return '';
        }
      })
      .join(),
  };
};
