import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config/defaults';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [BooksModule, ReviewsModule, MongooseModule.forRoot(config.DBUrl)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
