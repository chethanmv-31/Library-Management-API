import { IsEnum } from 'class-validator';
import { BookStock } from '../books.model';

export class UpdateBookSStock {
  @IsEnum(BookStock)
  stock: BookStock;
}
