import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubcategoryDto {
  @IsNotEmpty()
  @IsString()
  subcategory_name: string;

  @IsNotEmpty()
  categoryId: number;

}