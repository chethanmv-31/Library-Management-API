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
    user:User
  ): Promise<Borrowers> {
    
    const {
      borrowed_From,
      borrowed_TO,
      actual_Return_Date,
      book_id,
    } = createBorrowersDto;
    const borrowers = this.create({
      borrowed_From,
      borrowed_TO,
      actual_Return_Date,
      status: BorrowerStatus.RESERVED,
    });

    const book = await this.bookService.getBookById(book_id);
    borrowers.borrower = user;
    borrowers.book = book;
    borrowers.created_at = new Date();
    borrowers.created_by= user.id
    await this.save(borrowers);

    return borrowers;
  }
}
