import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { RatingRepository } from './rating.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entities';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/auth/entities/user.entity';
import { BooksModule } from 'src/books/books.module';

@Module({
  providers: [RatingsService, RatingRepository],
  controllers: [RatingsController],
  imports: [TypeOrmModule.forFeature([Rating, Book, User]),  BooksModule],
  
})
export class RatingsModule {}
