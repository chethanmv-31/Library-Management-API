import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { BookStock } from './books.model';

@Injectable()
export class BooksRepository extends Repository<Book> {
  constructor(private dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  private logger = new Logger('Book Repository');

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const {
      isbn_no,
      title,
      genre,
      authorName,
      price,
      no_of_copies,
      edition,
      language,
      publisher,
      binding
    } = createBookDto;

    const book = this.create({
      isbn_no,
      title,
      genre,
      authorName,
      price,
      no_of_copies,
      edition,
      language,
      binding,
      publisher,
      stock: BookStock.IN_STOCK,
    });
    await this.save(book);
    return book;
  }

  async getBooks(): Promise<Book[]> {
    const query = this.createQueryBuilder();
    try {
      const books = await query.getMany();
      this.logger.verbose(`Success to get tasks`);
      return books;
    } catch (error) {
      this.logger.error(`Failed to get tasks`, error.stack);
    }
  }
}
