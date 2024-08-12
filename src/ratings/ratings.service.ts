import { CreateRatingDto } from './dto/create-rating.dto';
import { Injectable } from '@nestjs/common';
import { RatingRepository } from './rating.repository';
import { Rating } from './entities/rating.entities';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class RatingsService {
  constructor(private ratingRepository: RatingRepository) {}

  async createRating(createRatingDto: CreateRatingDto, user:User): Promise<Rating> {
    return await this.ratingRepository.createRating(createRatingDto, user);
  }

  async getRating(bookId:string): Promise<Rating[]> {
    return await this.ratingRepository.getRatingByBooks(bookId);
  }
}
