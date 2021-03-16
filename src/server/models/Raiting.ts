import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IImage } from './Image';
import { IUser } from './Users';

export interface IRaiting extends Document {
  raiting?: number;
  comment?: string;
  image: IImage;
  user: IUser;
}

const RaitingSchema: Schema = new Schema({
  rating: Number,
  comment: String,
  image: { type: Schema.Types.ObjectId, ref: 'Image' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Raiting = mongoose.model<IRaiting>('Raiting', RaitingSchema);

export default Raiting;
