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
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class BooksService {
  constructor(
    private bookRepository: BooksRepository,
    private authorRepository: AuthorRepository,
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

  createBook(
    createBookDto: CreateBookDto,
    file: string,
    user: User,
  ): Promise<Book> {
    return this.bookRepository.createBook(createBookDto, file, user);
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

  async updateBook(
    id: string,
    updateBookDto: UpdateBookDto,
    updateAuthorDto: CreateAuthorDto,
    user: User,
  ): Promise<Book> {
    const { isbn_no, title, price, no_of_copies, stock, edition, language } =
      updateBookDto;

    const book = await this.getBookById(id);

    const author = await this.authorRepository.findOne({
      where: {
        author_Name: book.author.author_Name,
      },
    });

    if (!book) {
      throw new NotFoundException(`Book with id "${id}" is not found`);
    } else {
      author.author_Name = updateAuthorDto.author_Name;
      this.authorRepository.save(author);

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
