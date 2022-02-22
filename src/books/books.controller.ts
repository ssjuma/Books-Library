import { Body, Controller, Delete, Get, Post, Put, Param, Query } from '@nestjs/common';
import {BooksService} from './books.service';
import { BooksInterface } from './interfces/books.interface';
import { BooksDto } from './dto/books.dto';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService
  ) {}
  @Get()
  async findAll(@Query() qs): Promise<any[]>{
    const {sort} = qs;
    let books;
    console.log("Sort is: ", sort)
    if(sort === 'genre') {
      books = await this.booksService.findByGenre().then(book =>book);
    }else if(sort === 'genre-year') {
      books = await this.booksService.findByGenreYear().then(book =>book);
    }else if(sort === 'author') {
      books = await this.booksService.findByAuthor().then(book =>book);
    }else{
      books = await this.booksService.findAll().then(book => book);
    }
    return await Promise.all(books);
  }

  /*@Get('/find-by-genre-year')
  async findByGenre(): Promise<any[]>{
    let books = await this.booksService.findByGenre().then(book =>book);
    return await Promise.all(books);
  }*/

  @Get(':id')
  async findOne(@Param('id') id): Promise<BooksInterface>{
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body() createItem: BooksDto): Promise<BooksInterface>{
    //return `${createItem}`;
    return this.booksService.create(createItem)
  }

  @Put(':id')
  update(@Body() updateItem: BooksDto, @Param('id') id): Promise<BooksInterface>{
    return this.booksService.update(id, updateItem);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<BooksInterface>{
    return this.booksService.delete(id);
  }

}
