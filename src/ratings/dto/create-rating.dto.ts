import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0) // Optionally, set a minimum value as well
  @Max(5) // Maximum value of 5
  rating: number;

  @IsNotEmpty()
  bookId: string;
}
