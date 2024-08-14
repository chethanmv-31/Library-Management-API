import { IsNotEmpty } from 'class-validator';

export class CreateBorrowersDto {
 
  @IsNotEmpty()
  borrowed_From: Date;

  @IsNotEmpty()
  borrowed_TO: Date;

  @IsNotEmpty()
  actual_Return_Date: Date;

  @IsNotEmpty()
  book_id: string;
  

}
