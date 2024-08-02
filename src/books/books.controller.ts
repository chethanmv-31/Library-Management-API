import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';
import { BookStock } from './books.model';
import { UpdateBookSStock } from './dto/update-book-stock.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateAuthorDto } from 'src/author/dto/create-author.dto';

@Controller('books')
export class BooksController {
  private logger = new Logger('BookController');
  constructor(private booksService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('/:id')
  getBookById(@Param('id') id: string): Promise<Book> {
    return this.booksService.getBookById(id);
  }

  @Post()
  createBook(
    @Body() createBookDto: CreateBookDto,
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<Book> {
    this.logger.verbose(`Book is created `);
    return this.booksService.createBook(createBookDto, createAuthorDto);
  }

  @Delete('/:id')
  deleteBookById(@Param('id') id: string): Promise<string> {
    return this.booksService.deleteBookById(id);
  }

  @Patch('/:id/stock')
  updateBookStock(
    @Param('id') id: string,
    @Body() updateBookStock: UpdateBookSStock,
  ): Promise<Book> {
    const { stock } = updateBookStock;
    return this.booksService.updateBookStock(id, stock);
  }

  @Patch('/:id')
  updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Body() updateAuthorDto: CreateAuthorDto,
  ): Promise<Book> {
    return this.booksService.updateBook(id, updateBookDto, updateAuthorDto);
  }
}
