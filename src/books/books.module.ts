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
import { ShelfService } from 'src/shelf/shelf.service';
import { ShelfRepository } from 'src/shelf/shelf.repository';
import { Shelf } from 'src/shelf/entities/shelf.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PublisherService } from 'src/publisher/publisher.service';
import { PublisherRepository } from 'src/publisher/publisher.repository';
import { RatingsService } from 'src/ratings/ratings.service';
import { RatingRepository } from 'src/ratings/rating.repository';
import { S3Service } from 'src/s3Service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Author, Binding, Shelf]),
    AuthModule,
  ],
  controllers: [BooksController],
  providers: [
    BooksService,
    BooksRepository,
    AuthorRepository,
    BindingService,
    AuthorService,
    BindingRepository,
    CategoryRepository,
    CategoryService,
    ShelfService,
    ShelfRepository,
    PublisherService,
    PublisherRepository,
    RatingRepository,
    RatingsService,
    S3Service,
    ConfigService
  ],

  exports: [BooksService, BooksRepository],
})
export class BooksModule {}
