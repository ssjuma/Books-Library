import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {BooksInterface} from './interfces/books.interface';
import { ReviewsInterface } from '../reviews/interfces/reviews.interface';
import { Book, BookDocument } from './schema/books.schema';
import { ReviewDocument } from '../reviews/schema/reviews.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Book') private bookModel:Model<BookDocument>,
    @InjectModel('Review') private reviewModel:Model<ReviewDocument>
  ) {}

  async findAll():Promise<Book[]>{
    let books = await this.bookModel.find().then(book =>book);
    const myBooks = [];
    for (const mybook of books) {
      let reviews = await this.reviewModel.where('book', mybook._id).then(rv=>rv);
      let mbook = {
        title: mybook.title,
        description: mybook.description,
        author: mybook.author,
        id: mybook.id,
        year: mybook.year,
        genre: mybook.genre,
        releaseDate: mybook.releaseDate,
        reviews: reviews
      }
      myBooks.push(mbook);
    }
    return await Promise.all(myBooks);
  }
  async findByGenre():Promise<Book[]>{

    let books = await this.bookModel.aggregate([
      {
        "$group" : {_id:"$genre"}
      }
    ]);

    const myBooks = [];

    for(const book of books){
      let allBooks = await this.bookModel.where('genre', book._id).then(rv=>rv);

      const myBooks1 = [];
      for (const mybook1 of allBooks) {

        //genres.push({name: books._id});

        let reviews = await this.reviewModel.where('book', mybook1._id).then(rv=>rv);

        let mbook = {
          title: mybook1.title,
          description: mybook1.description,
          author: mybook1.author,
          id: mybook1.id,
          year: mybook1.year,
          genre: mybook1.genre,
          releaseDate: mybook1.releaseDate,
          reviews: reviews
        }
        myBooks1.push(mbook);
      }

      myBooks.push({
        "genre": book._id,
        "books": myBooks1
      });
    }

    return myBooks;
  }

  async findByAuthor():Promise<Book[]>{

    let authors = await this.bookModel.aggregate([
      {
        "$group" : {_id:"$author"}
      }
    ]);

    const myBooks = [];

    for(const author of authors){
      let allBooks = await this.bookModel.aggregate([
        {
          "$match" : {"author": author._id}
        },
        {
          "$group" : {
            _id: "$year", "fields":{"$first":"$$ROOT"}
          }
        },
        {
          "$replaceRoot":{"newRoot":"$fields"}
        }
      ]);

      const myBooks1 = [];
      for (const mybook1 of allBooks) {

        //genres.push({name: books._id});

        let reviews = await this.reviewModel.where('book', mybook1._id).then(rv=>rv);

        let mbook = {
          title: mybook1.title,
          description: mybook1.description,
          author: mybook1.author,
          id: mybook1.id,
          year: mybook1.year,
          genre: mybook1.genre,
          releaseDate: mybook1.releaseDate,
          reviews: reviews
        }
        myBooks1.push(mbook);
      }

      myBooks.push({
        "author": author._id,
        "books": myBooks1
      });
    }

    return myBooks;
  }

  async findByGenreYear():Promise<Book[]>{

    let genres = await this.bookModel.aggregate([
      {
        "$group" : {_id:"$genre"}
      }
    ]);

    console.log("all genres: ", genres);

    let bookObj = {genre: {name: String, year: {year: Number, books: []}}};
    const myBooks = [];
    for(const genre of genres) {
      console.log("my genre is: ", genre);
      bookObj.genre.name = genre._id;
      //let allBooks1 = await this.bookModel.where('genre', book._id).then(rv => rv);
      let allBooks1 = await this.bookModel.aggregate([
        {
          "$match" : {"genre": genre._id}
        },
        {
          "$group" : {_id: "$year", "fields":{"$first":"$$ROOT"}}
        },
        {
          "$replaceRoot":{"newRoot":"$fields"}
        }
      ]);

      console.log("allBooks1: ", allBooks1);

      for (const mybook2 of allBooks1) {
        const myBooks1 = [];
        // @ts-ignore
        bookObj.genre.year.year =  mybook2.year;

        let allBooks = await this.bookModel.where('year', mybook2.year).then(rv => rv);

        for (const mybook1 of allBooks) {
          let reviews = await this.reviewModel.where('book', mybook1._id).then(rv => rv);
          let mbook = {
            title: mybook1.title,
            description: mybook1.description,
            author: mybook1.author,
            id: mybook1.id,
            year: mybook1.year,
            genre: mybook1.genre,
            releaseDate: mybook1.releaseDate,
            reviews: reviews
          }
          myBooks1.push(mbook);
        }
      bookObj.genre.year.books = myBooks1;
      }
      myBooks.push(bookObj);
    }

    return myBooks;
  }

  async findOne(id: string): Promise<BooksInterface>{
    return this.bookModel.findOne({_id: id});
  }
  async create(item: BooksInterface): Promise<BooksInterface>{
    const createItem = new this.bookModel(item)
    return createItem.save();
  }
  async delete(id: string): Promise<BooksInterface>{
    return this.bookModel.findByIdAndRemove({_id: id});
  }
  async update(id: string, item: BooksInterface): Promise<BooksInterface>{
    return this.bookModel.findByIdAndUpdate(id, item);
  }
}
