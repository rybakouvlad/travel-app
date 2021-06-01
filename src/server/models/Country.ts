import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

export interface ICountry extends Document {
  alpha2: string;
  name_by: string;
  name_ru: string;
  name_en: string;
  capital_by: string;
  capital_ru: string;
  capital_en: string;
  description_by: string;
  description_ru: string;
  description_en: string;
  currency: string;
}

const CountrySchema: Schema = new Schema({
  alpha2: String,
  name_by: String,
  name_ru: String,
  name_en: String,
  capital_by: String,
  capital_ru: String,
  capital_en: String,
  description_by: String,
  description_ru: String,
  description_en: String,
  currency: String,
});

const Country = mongoose.model<ICountry>('Country', CountrySchema);

export default Country;
