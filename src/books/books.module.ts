import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book, BookSchema } from './schema/books.schema';
import { Review, ReviewSchema } from '../reviews/schema/reviews.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Book.name, schema: BookSchema}, {name: Review.name, schema: ReviewSchema}])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
