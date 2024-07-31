import { CreateBookDto } from './dto/create-book-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from './book.repository';
import { Book } from './book.entity';
import { BookStock } from './books.model';
import { UpdateBook } from './dto/update-book-dto';

@Injectable()
export class BooksService {
  constructor(private bookRepository: BooksRepository) {}

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.getBooks();
  }

  async getBookById(id: string): Promise<Book> {
    const found = await this.bookRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!found)
      throw new NotFoundException(`Book  with id "${id}" is not found`);

    return found;
  }

  createBook(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookRepository.createBook(createBookDto);
  }

  async deleteBookById(id: string): Promise<string> {
    const result = await this.bookRepository.delete({ id: id });

    console.log('result', result);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id "${id}" is not found!`);
    }
    if (result.affected === 1) {
      return `Delete Success`;
    }
  }

  async updateBookStock(id: string, updateBookStock: BookStock): Promise<Book> {
    const book = await this.getBookById(id);
    if (!book) {
      throw new NotFoundException(`Book with id "${id}" is not found`);
    } else {
      book.stock = updateBookStock;
      this.bookRepository.save(book);
      return book;
    }
  }

  async updateBook(id: string, updateBook: UpdateBook): Promise<Book> {
    const {
      title,
      authorName,
      copies,
      language,
      price,
      stock,
      subject,
      topic,
    } = updateBook;
    const book = await this.getBookById(id);
    if (!book) {
      throw new NotFoundException(`Book with id "${id}" is not found`);
    } else {
      book.stock = stock;
      book.title = title;
      book.authorName = authorName;
      book.copies = copies;
      book.language = language;
      book.price = price;
      book.subject = subject;
      book.topic = topic;
      this.bookRepository.save(book);
      return book;
    }
  }
}
