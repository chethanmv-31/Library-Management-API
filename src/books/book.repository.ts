import { CreateAuthorDto } from 'src/author/dto/create-author.dto';
import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { BookStock } from './books.model';
import { AuthorRepository } from 'src/author/author.repository';

@Injectable()
export class BooksRepository extends Repository<Book> {
  constructor(
    private dataSource: DataSource,
    private authorRepository: AuthorRepository,
  ) {
    super(Book, dataSource.createEntityManager());
  }

  private logger = new Logger('Book Repository');

  async createBook(
    createBookDto: CreateBookDto,
    createAuthorDto: CreateAuthorDto,
  ): Promise<Book> {
    const { author_Name } = createAuthorDto;
    const authors = this.authorRepository.create({ author_Name });
    await this.authorRepository.save(authors);
    const {
      isbn_no,
      title,
      genre,
      price,
      no_of_copies,
      edition,
      language,
      publisher,
      binding,
    } = createBookDto;
    const book = this.create({
      isbn_no,
      title,
      genre,
      price,
      no_of_copies,
      edition,
      language,
      binding,
      publisher,
      stock: BookStock.IN_STOCK,
    });
    book.author = authors;
    await this.save(book);
    return book;
  }

  async getBooks(): Promise<Book[]> {
    const query = this.createQueryBuilder('book').leftJoinAndSelect(
      'book.author',
      'author',
    );
    try {
      const books = await query.getMany();
      this.logger.verbose(`Success to get tasks`);
      return books;
    } catch (error) {
      this.logger.error(`Failed to get tasks`, error.stack);
    }
  }
}
