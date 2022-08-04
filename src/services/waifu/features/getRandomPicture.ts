import { Readable } from 'stream';
import { randomFrom } from '../../../utils';
import { NSFW_CATEGORIES, SFW_CATEGORIES, TYPES } from '../constants';
import { PictureType } from '../interfaces';
import { getPicture } from './getPicture';

export async function getRandomPicture(type?: PictureType): Promise<Readable> {
  const pictureType = type ? type : randomFrom(TYPES);
  const pictureCategory = randomFrom(
    type === 'sfw' ? SFW_CATEGORIES : NSFW_CATEGORIES
  );
  return getPicture(pictureType, pictureCategory);
}
