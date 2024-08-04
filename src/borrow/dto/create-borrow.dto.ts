import { IsNotEmpty } from 'class-validator';

export class CreateBorrowDto {
  @IsNotEmpty()
  borrow_date: Date;

  @IsNotEmpty()
  return_date: Date;

  @IsNotEmpty()
  borrower_id: number;

  @IsNotEmpty()
  book_id: string;
}
