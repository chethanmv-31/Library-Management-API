import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BooksRepository } from './book.repository';
import { Author } from 'src/author/entities/author.entity';
import { AuthorRepository } from 'src/author/author.repository';
import { AuthorService } from 'src/author/author.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, AuthorRepository, AuthorService],
})
export class BooksModule {}
