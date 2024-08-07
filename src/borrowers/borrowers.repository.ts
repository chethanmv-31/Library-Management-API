import { DataSource, Repository } from 'typeorm';
import { Borrowers } from './entities/borrowers.entity';
import { Injectable } from '@nestjs/common';
import { CreateBorrowersDto } from './dto/create-borrowers.dto';
import { BooksService } from 'src/books/books.service';
import { BorrowerStatus } from './dto/status.model';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class BorrowersRepository extends Repository<Borrowers> {
  constructor(
    private dataSource: DataSource,

    private bookService: BooksService,
  ) {
    super(Borrowers, dataSource.createEntityManager());
  }

  async getAllBorrowers(): Promise<Borrowers[]> {
    const query = this.createQueryBuilder('borrowers').leftJoinAndSelect(
      'borrowers.book',
      'book',
    );
    const borrow = await query.getMany();
    return borrow;
  }

  async createBorrowers(
    createBorrowersDto: CreateBorrowersDto,
  ): Promise<Borrowers> {
    
    const {
      borrowed_From,
      borrowed_TO,
      borrower_name,
      actual_Return_Date,
      book_id,
    } = createBorrowersDto;
    const borrowers = this.create({
      borrowed_From,
      borrowed_TO,
      borrower_name,
      actual_Return_Date,
      status: BorrowerStatus.RESERVED,
    });


    const book = await this.bookService.getBookById(book_id);
    borrowers.book = book;
    await this.save(borrowers);

    return borrowers;
  }
}
