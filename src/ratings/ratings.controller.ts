import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Rating } from './entities/rating.entities';
import { GetUser } from 'src/auth/guards/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/role-auth.guard';
import { Roles } from 'src/auth/guards/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/auth/roles.model';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private ratingService: RatingsService) {}

  @Post('/createRating')
  @Roles(Role.STUDENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createRating(
    @Body() createRatingDto: CreateRatingDto,
    @GetUser() user: User,
  ): Promise<Rating> {
    return await this.ratingService.createRating(createRatingDto, user);
  }
  @Get('/:bookId')
  // @Roles(Role.STUDENT)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async getRating(@Param('bookId') bookId: string): Promise<Rating[]> {
    return await this.ratingService.getRating(bookId);
  }
}
