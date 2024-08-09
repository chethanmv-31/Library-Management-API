import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  no_of_copies: number;

  @IsNotEmpty()
  isbn_no: string;

  
  @IsNotEmpty()
  edition: string;
  
  publisher: number;
  
  author_id: number;

  binding_id: number;

  category_id: number;

  shelf_id: number;

  @IsNotEmpty()
  language: string;
}
