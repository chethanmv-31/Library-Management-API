import { CreateAuthorDto } from 'src/author/dto/create-author.dto';
import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { BookStock } from './dto/books.model';
import { AuthorRepository } from 'src/author/author.repository';
import { BindingRepository } from 'src/binding/binding.repository';
import { CreateBindingDto } from 'src/binding/dto/create-binding.dto';
import { AuthorService } from 'src/author/author.service';
import { BindingService } from 'src/binding/binding.service';
import { CategoryService } from 'src/category/category.service';
import { ShelfService } from 'src/shelf/shelf.service';
import { PublisherService } from 'src/publisher/publisher.service';

@Injectable()
export class BooksRepository extends Repository<Book> {
  constructor(
    private dataSource: DataSource,
    private authorService: AuthorService,
    private bindingService: BindingService,
    private categoryService: CategoryService,
    private shelfService: ShelfService,
    private publisherService: PublisherService,
  ) {
    super(Book, dataSource.createEntityManager());
  }

  private logger = new Logger('Book Repository');

  async createBook(createBookDto: CreateBookDto, file: string): Promise<Book> {
    const {
      isbn_no,
      title,
      price,
      binding_id,
      author_id,
      no_of_copies,
      edition,
      language,
      shelf_id,

      category_id,
      publisher_id,
    } = createBookDto;

    const category = await this.categoryService.getCategoryById(category_id);
    const author = await this.authorService.getAuthorById(author_id);
    const binding = await this.bindingService.getBindingById(binding_id);
    const shelf = await this.shelfService.getShelfById(shelf_id);
    const publishers =
      await this.publisherService.getPublisherById(publisher_id);

    const book = this.create({
      isbn_no,
      title,
      price,
      no_of_copies,
      edition,
      language,
      stock: BookStock.IN_STOCK,
    });
    book.author = author;
    book.binding = binding;
    book.category = category;
    book.shelf = shelf;
    book.publisher = publishers;
    book.image = file;
    book.createdAt = new Date();
    await this.save(book);
    return book;
  }

  async getBooks(): Promise<Book[]> {
    const query = this.createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.binding', 'binding')
      .leftJoinAndSelect('book.category', 'category');
    try {
      const books = await query.getMany();
      this.logger.verbose(`Success to get tasks`);
      return books;
    } catch (error) {
      this.logger.error(`Failed to get tasks`, error.stack);
    }
  }
}
