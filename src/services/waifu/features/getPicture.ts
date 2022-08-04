import axios from 'axios';
import { Readable } from 'stream';
import { PictureCategory, PictureType } from '../interfaces';
import { waifuAxios } from '../waifuAxios';

export async function getPicture<T extends PictureType>(
  type: T,
  category: PictureCategory<T>
): Promise<Readable> {
  const { data } = await waifuAxios.get(`${type}/${category}`);
  const { data: file } = await axios.get(data.url, { responseType: 'stream' });
  return file;
}
