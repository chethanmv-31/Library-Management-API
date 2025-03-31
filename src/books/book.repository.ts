import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { BookStock } from './dto/books.model';
import { AuthorService } from 'src/author/author.service';
import { BindingService } from 'src/binding/binding.service';
import { CategoryService } from 'src/category/category.service';
import { ShelfService } from 'src/shelf/shelf.service';
import { PublisherService } from 'src/publisher/publisher.service';
import { User } from 'src/auth/entities/user.entity';
import { Author } from 'src/author/entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { AuthorRepository } from 'src/author/author.repository';
import { CategoryRepository } from 'src/category/category.repository';
import { BindingRepository } from 'src/binding/binding.repository';
import { ShelfRepository } from 'src/shelf/shelf.repository';
import { PublisherRepository } from 'src/publisher/publisher.repository';

@Injectable()
export class BooksRepository extends Repository<Book> {
  constructor(
    private dataSource: DataSource,
    private authorService: AuthorService,
    private bindingService: BindingService,
    private categoryService: CategoryService,
    private shelfService: ShelfService,
    private publisherService: PublisherService,
    private authorRepository: AuthorRepository,
    private categoryRepository: CategoryRepository,
    private bindingRepository: BindingRepository,
    private shelfRepository: ShelfRepository,
    private publisherRepository: PublisherRepository,
  ) {
    super(Book, dataSource.createEntityManager());
  }

  private logger = new Logger('Book Repository');

  async createBook(
    createBookDto: CreateBookDto,
    file: string,
    user: User,
  ): Promise<Book> {
    const {
      isbn_no,
      title,
      price,
      no_of_copies,
      edition,
      language,
      publisher_id,
      author_id,
      authorName,
      category_id,
      categoryName,
      binding_id,
      bindingName,
      shelf_id,
      shelfNo,
      floorNo,
      publisherName,
    } = createBookDto;

    let author;
    if (author_id) {
      author = await this.authorService.getAuthorById(author_id);
    } else if (authorName) {
      const authorDto = { author_Name: authorName };
      author = await this.authorRepository.createAuthor(authorDto, user);
    }
    if (!author) {
      throw new NotFoundException('Author not found or could not be created');
    }

    let category;
    if (category_id) {
      category = await this.categoryService.getCategoryById(category_id);
    } else if (categoryName) {
      const categoryDto = { category_name: categoryName };
      category = await this.categoryRepository.createCategory(
        categoryDto,
        user,
      );
    }
    if (!category) {
      throw new NotFoundException('Category not found or could not be created');
    }

    let binding;
    if (binding_id) {
      binding = await this.bindingService.getBindingById(binding_id);
    } else if (bindingName) {
      const bindingDto = { binding_name: bindingName };
      binding = await this.bindingRepository.createBinding(bindingDto, user);
    }
    if (!binding) {
      throw new NotFoundException('Binding not found or could not be created');
    }

    let shelf;
    if (shelf_id) {
      shelf = await this.shelfService.getShelfById(shelf_id);
    } else if (shelfNo || floorNo) {
      const shelfDto = { Shelf_No: shelfNo, Floor_No: floorNo };
      shelf = await this.shelfRepository.createShelf(shelfDto, user);
    }

    if (!shelf) {
      throw new NotFoundException('Shelf not found or could not be created');
    }

    let publisher;
    if (publisher_id) {
      publisher = await this.publisherService.getPublisherById(publisher_id);
    } else if (publisherName) {
      const publisherDto = { publisher_name: publisherName };
      publisher = await this.publisherRepository.createPublisher(
        publisherDto,
        user,
      );
    }
    if (!publisher) {
      throw new NotFoundException(
        'Publisher not found or could not be created',
      );
    }

    const book = this.create({
      isbn_no,
      title,
      price,
      no_of_copies,
      edition,
      language,
      stock: BookStock.IN_STOCK,
    });
    book.created_by = user.id;
    book.author = author;
    book.binding = binding;
    book.category = category;
    book.shelf = shelf;
    book.publisher = publisher;
    book.image = file;
    book.created_at = new Date();
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
      this.logger.verbose(`Success to get books`);
      return books;
    } catch (error) {
      this.logger.error(`Failed to get books`, error.stack);
    }
  }
}
