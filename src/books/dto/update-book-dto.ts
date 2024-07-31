import { IsEnum } from 'class-validator';
import { BookStock } from '../books.model';

export class UpdateBook {
  title: string;
  authorName: string;
  price: string;
  copies: number;
  topic: string;
  subject: string;
  language: string;
  @IsEnum(BookStock)
  stock: BookStock;
}
