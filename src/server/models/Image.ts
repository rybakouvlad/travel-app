import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { ICountry } from './Country';

export interface IImage extends Document {
  name_by: string;
  name_ru: string;
  name_en: string;
  country: ICountry | string;
  path: string;
  description_by: string;
  description_ru: string;
  description_en: string;
}

const ImageSchema: Schema = new Schema({
  name_by: String,
  name_ru: String,
  name_en: String,
  country: { type: Schema.Types.ObjectId, ref: 'Country' },
  path: String,
  description_by: String,
  description_ru: String,
  description_en: String,
});

const Image = mongoose.model<IImage>('Image', ImageSchema);

export default Image;
