import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Rating } from './entities/rating.entities';
import { CreateRatingDto } from './dto/create-rating.dto';
import { BooksService } from 'src/books/books.service';
import { BooksRepository } from 'src/books/book.repository';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class RatingRepository extends Repository<Rating> {
  constructor(
    private dataSource: DataSource,
    private bookService: BooksService,
    private bookRepository: BooksRepository,
  ) {
    super(Rating, dataSource.createEntityManager());
  }

  async createRating(
    createRatingDto: CreateRatingDto,
    user: User,
  ): Promise<Rating> {
    const { rating, bookId } = createRatingDto;
    const book = await this.bookRepository.find({ where: { id: bookId } });

    const ratings = this.create({ rating });
    ratings.createdAt = new Date();

    ratings.book = book[0];
    ratings.user = user;
    await this.save(ratings);

    return ratings;
  }

  async getRatingByBooks(bookId: string): Promise<Rating[]> {
    // const query = this.createQueryBuilder('rating').leftJoinAndSelect(
    //   'rating.book',
    //   'book',
    // );

    const ratings = this.find({ where: { book: { id: bookId } }, relations:['user'] });
    // const rating = await query.getMany();
    return ratings;
  }
}
