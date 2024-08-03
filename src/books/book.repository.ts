import { CreateAuthorDto } from 'src/author/dto/create-author.dto';
import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { BookStock } from './books.model';
import { AuthorRepository } from 'src/author/author.repository';
import { BindingRepository } from 'src/binding/binding.repository';
import { CreateBindingDto } from 'src/binding/dto/create-binding.dto';
import { AuthorService } from 'src/author/author.service';
import { BindingService } from 'src/binding/binding.service';

@Injectable()
export class BooksRepository extends Repository<Book> {
  constructor(
    private dataSource: DataSource,
    private authorService: AuthorService,
    private bindingService: BindingService,
  ) {
    super(Book, dataSource.createEntityManager());
  }

  private logger = new Logger('Book Repository');

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const {
      isbn_no,
      title,
      genre,
      price,
      binding_id,
      author_id,
      no_of_copies,
      edition,
      language,
      publisher,
    } = createBookDto;

    const author = await this.authorService.getAuthorById(author_id);
    const binding = await this.bindingService.getBindingById(binding_id);

    const book = this.create({
      isbn_no,
      title,
      genre,
      price,
      no_of_copies,
      edition,
      language,
      publisher,
      stock: BookStock.IN_STOCK,
    });
    book.author = author;
    book.binding = binding;
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
