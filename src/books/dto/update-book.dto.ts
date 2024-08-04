import { IsEnum } from 'class-validator';
import { BookStock } from './books.model';

export class UpdateBookDto {
  title: string;
  price: string;
  no_of_copies: number;
  edition: string;
  publisher: string;
  language: string;
  genre: string;
  binding: string;
  isbn_no: string;
  @IsEnum(BookStock)
  stock: BookStock;
}
