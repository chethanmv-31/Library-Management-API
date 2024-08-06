import { IsNotEmpty } from 'class-validator';

export class CreateBorrowersDto {
  @IsNotEmpty()
  borrower_name: string;

  @IsNotEmpty()
  borrowed_From: Date;

  @IsNotEmpty()
  borrowed_TO: Date;

  @IsNotEmpty()
  actual_Return_Date: Date;

  @IsNotEmpty()
  book_id: string;
  

}
