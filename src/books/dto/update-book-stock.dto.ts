import { IsEnum } from 'class-validator';
import { BookStock } from './books.model';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookSStock {
  @IsEnum(BookStock)
  @ApiProperty({ example: 'IN_STOCK | OUT_OF_STOCK' })
  stock: BookStock;
}
