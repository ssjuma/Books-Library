import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Review } from '../../reviews/schema/reviews.schema';
//const {Schema, Document} = mongoose;
export type BookDocument = Book & mongoose.Document;

@Schema()
export class Book {
  @Prop()
  title: string;
  @Prop()
  releaseDate: number;
  @Prop()
  genre: string;
  @Prop()
  year: number;
  @Prop()
  author: string;
  @Prop()
  description: string;
}
export const BookSchema = SchemaFactory.createForClass(Book);
