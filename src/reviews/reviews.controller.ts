import { Body, Controller, Delete, Get, Post, Put, Param } from '@nestjs/common';
import {ReviewsDto} from './dto/reviews.dto';
import {ReviewsService} from './reviews.service';
import { ReviewsInterface } from './interfces/reviews.interface';
import { Review, ReviewDocument } from './schema/reviews.schema';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {
  }
  @Get()
  async findAll(): Promise<Review[]>{
    return this.reviewsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<ReviewsInterface>{
    return this.reviewsService.findOne(id);
  }

  @Post()
  create(@Body() createItem: ReviewsDto): Promise<ReviewDocument>{
    //return `${createItem}`;
    return this.reviewsService.create(createItem)
  }

  @Put(':id')
  update(@Body() updateItem: ReviewsDto, @Param('id') id): Promise<ReviewsInterface>{
    return this.reviewsService.update(id, updateItem);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<ReviewsInterface>{
    return this.reviewsService.delete(id);
  }

}
