import axios from 'axios';
import { Readable } from 'stream';
import { PictureType } from './interfaces';
import { waifuAxios } from './waifuAxios';

export async function getRandomPicture(type: PictureType): Promise<Readable> {
  const { data } = await waifuAxios.get('sfw/waifu');
  const file = await axios.get(data.url, { responseType: 'stream' });
  return file.data;
}
