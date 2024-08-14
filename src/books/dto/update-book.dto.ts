import { IsEnum, IsNotEmpty } from 'class-validator';
import { BookStock } from './books.model';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({ example: 'The Great Gatsby' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '150' })
  @IsNotEmpty()
  price: string;

  @ApiProperty({ example: 105 })
  @IsNotEmpty()
  no_of_copies: number;

  @ApiProperty({ example: '926325619' })
  @IsNotEmpty()
  isbn_no: string;

  @IsNotEmpty()
  @ApiProperty({ example: '1st Edition' })
  edition: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  publisher_id: number;

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  author_id: number;

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  binding_id: number;

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  category_id: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  shelf_id: number;

  @ApiProperty({ example: 'English' })
  @IsNotEmpty()
  language: string;
  
  @IsEnum(BookStock)
  @ApiProperty({ example: 'IN_STOCK | OUT_OF_STOCK' })
  stock: BookStock;
}
