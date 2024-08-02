import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  authorName: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  no_of_copies: number;

  @IsNotEmpty()
  isbn_no: string;

  @IsNotEmpty()
  publisher: string;

  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  edition: string;

  @IsNotEmpty()
  binding: string;

  @IsNotEmpty()
  language: string;
}
