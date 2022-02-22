import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
//const {Schema, Document} = mongoose;
import { Book } from '../../books/schema/books.schema';
export type ReviewDocument = Review & mongoose.Document;

@Schema()
export class Review {
  @Prop()
  review: string;
  @Prop()
  rating: number;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Book'})
  book: Book
}
export const ReviewSchema = SchemaFactory.createForClass(Review);
