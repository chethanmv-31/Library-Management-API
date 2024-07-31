import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  authorName: string;


  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  copies: number;

  @IsNotEmpty()
  topic: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  language: string;
}
