import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {ReviewsInterface} from './interfces/reviews.interface';
import { Review, ReviewDocument } from './schema/reviews.schema';
import { ReviewsDto } from './dto/reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel('Review') private reviewModel:Model<ReviewDocument>) {}

  async findAll():Promise<Review[]>{
    return this.reviewModel.find().populate('book');
  }
  async findOne(id: string): Promise<ReviewsInterface>{
    return this.reviewModel.findOne({_id: id});
  }
  async findByBook(id: string): Promise<ReviewsInterface>{
    return this.reviewModel.findById({bookId: id});
  }
  async create(item: ReviewsDto): Promise<ReviewDocument>{
    const createItem = new this.reviewModel(item)
    return createItem.save();
  }
  async delete(id: string): Promise<ReviewsInterface>{
    return this.reviewModel.findByIdAndRemove({_id: id});
  }
  async update(id: string, item: ReviewsInterface): Promise<ReviewsInterface>{
    return this.reviewModel.findByIdAndUpdate(id, item);
  }
}
