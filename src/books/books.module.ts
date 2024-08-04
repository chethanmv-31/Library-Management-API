import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BooksRepository } from './book.repository';
import { Author } from 'src/author/entities/author.entity';
import { AuthorRepository } from 'src/author/author.repository';
import { AuthorService } from 'src/author/author.service';
import { Binding } from 'src/binding/entities/binding.entity';
import { BindingRepository } from 'src/binding/binding.repository';
import { BindingService } from 'src/binding/binding.service';
import { CategoryRepository } from 'src/category/category.repository';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Binding])],
  controllers: [BooksController],
  providers: [
    BooksService,
    BooksRepository,
    AuthorRepository,
    BindingService,
    AuthorService,
    BindingRepository,
    CategoryRepository,
    CategoryService
  ],
  exports:[BooksService]
})
export class BooksModule {}
