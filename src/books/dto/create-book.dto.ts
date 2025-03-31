import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
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

  @ApiProperty({ example: '1st Edition' })
  edition: string;

  @ApiProperty({ example: 1 })
  publisher_id: number;

  @ApiProperty({ example: 1 })
  author_id: number;

  @ApiProperty({ example: 1 })
  binding_id: number;

  @ApiProperty({ example: 1 })
  category_id: number;

  @ApiProperty({ example: 1 })
  shelf_id: number;

  @ApiProperty({ example: 'English' })
  @IsNotEmpty()
  language: string;

  @IsOptional()
  @IsString()
  authorName: string; // Accept author as name

  @IsOptional()
  @IsString()
  categoryName?: string;

  @IsOptional()
  @IsString()
  bindingName?: string;

  @IsOptional()
  @IsString()
  shelfNo?: number;

  @IsOptional()
  @IsString()
  floorNo?: number;

  @IsOptional()
  @IsString()
  publisherName?: string;
}
