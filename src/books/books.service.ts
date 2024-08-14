import { AuthorService } from './../author/author.service';
import { AuthorRepository } from 'src/author/author.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from './book.repository';
import { Book } from './entities/book.entity';
import { BookStock } from './dto/books.model';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateAuthorDto } from 'src/author/dto/create-author.dto';
import { Author } from 'src/author/entities/author.entity';
import { CreateBindingDto } from 'src/binding/dto/create-binding.dto';
import { BindingService } from 'src/binding/binding.service';
import { CategoryService } from 'src/category/category.service';
import { PublisherService } from 'src/publisher/publisher.service';
import { ShelfService } from 'src/shelf/shelf.service';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class BooksService {
  constructor(
    private bookRepository: BooksRepository,
    private authorService: AuthorService,
    private bindingService: BindingService,
    private categoryService: CategoryService,
    private shelfService: ShelfService,
    private publisherService: PublisherService,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.getBooks();
  }

  async getBookById(id: string): Promise<Book> {
    const found = await this.bookRepository.findOne({
      where: {
        id: id,
      },
      relations: ['author', 'binding', 'category'],
    });

    if (!found)
      throw new NotFoundException(`Book  with id "${id}" is not found`);

    return found;
  }

  createBook(createBookDto: CreateBookDto, file: string): Promise<Book> {
    return this.bookRepository.createBook(createBookDto, file);
  }

  async deleteBookById(id: string): Promise<string> {
    const result = await this.bookRepository.delete({ id: id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id "${id}" is not found!`);
    }
    if (result.affected === 1) {
      return `Delete Success`;
    }
  }

  async updateBookStock(
    id: string,
    updateBookStock: BookStock,
    user: User,
  ): Promise<Book> {
    const book = await this.getBookById(id);
    if (!book) {
      throw new NotFoundException(`Book with id "${id}" is not found`);
    } else {
      book.stock = updateBookStock;
      book.updated_at = new Date();
      book.updated_by = user.id;
      this.bookRepository.save(book);
      return book;
    }
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto, user: User,): Promise<Book> {
    const {
      isbn_no,
      title,
      price,
      no_of_copies,
      stock,
      edition,
      language,
      author_id,
      binding_id,
      category_id,
      publisher_id,
      shelf_id,
    } = updateBookDto;

    const book = await this.getBookById(id);

    if (!book) {
      throw new NotFoundException(`Book with id "${id}" is not found`);
    } else {
      const category = await this.categoryService.getCategoryById(category_id);
      const author = await this.authorService.getAuthorById(author_id);
      const binding = await this.bindingService.getBindingById(binding_id);
      const shelf = await this.shelfService.getShelfById(shelf_id);
      const publishers =
        await this.publisherService.getPublisherById(publisher_id);
        
      book.author = author;
      book.binding = binding;
      book.category = category;
      book.shelf = shelf;
      book.publisher = publishers;
      book.stock = stock;
      book.isbn_no = isbn_no;
      book.title = title;
      book.no_of_copies = no_of_copies;
      book.language = language;
      book.price = price;
      book.edition = edition;
      book.updated_at = new Date();
      book.updated_by = user.id;

      this.bookRepository.save(book);
      return book;
    }
  }

  async updateBookImage(
    id: string,
    imageUrl: string,
    user: User,
  ): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    book.image = imageUrl;
    book.updated_by = user.id;
    return this.bookRepository.save(book);
  }
}
