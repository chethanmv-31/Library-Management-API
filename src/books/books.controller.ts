import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { BookStock } from './dto/books.model';
import { UpdateBookSStock } from './dto/update-book-stock.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateAuthorDto } from 'src/author/dto/create-author.dto';
import { CreateBindingDto } from 'src/binding/dto/create-binding.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BooksController {
  private logger = new Logger('BookController');
  constructor(private booksService: BooksService) {}

  @Get()
  @UseGuards(AuthGuard())
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getBookById(@Param('id') id: string): Promise<Book> {
    return this.booksService.getBookById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteBookById(@Param('id') id: string): Promise<string> {
    return this.booksService.deleteBookById(id);
  }

  @Patch('/:id/stock')
  @UseGuards(AuthGuard())
  updateBookStock(
    @Param('id') id: string,
    @Body() updateBookStock: UpdateBookSStock,
  ): Promise<Book> {
    const { stock } = updateBookStock;
    return this.booksService.updateBookStock(id, stock);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Body() updateAuthorDto: CreateAuthorDto,
  ): Promise<Book> {
    return this.booksService.updateBook(id, updateBookDto, updateAuthorDto);
  }
}
