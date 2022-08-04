import { NSFW, NSFW_CATEGORIES, SFW, SFW_CATEGORIES } from './constants';

export type PictureSfwType = typeof SFW;
export type PictureNsfwType = typeof NSFW;
export type PictureSfwCategory = typeof SFW_CATEGORIES[number];
export type PictureNsfwCategory = typeof NSFW_CATEGORIES[number];

export type PictureType = PictureSfwType | PictureNsfwType;
export type PictureCategory<T extends PictureType> = T extends PictureSfwType
  ? PictureSfwCategory
  : PictureNsfwCategory;
