import { IsNotEmpty } from 'class-validator';

export class CreateShelfDto {
  @IsNotEmpty()
  Shelf_No: number;

  @IsNotEmpty()
  Floor_No: number;
}
