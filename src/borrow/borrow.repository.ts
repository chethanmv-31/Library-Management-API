// import { Injectable } from '@nestjs/common';
// import { Repository, DataSource } from 'typeorm';
// import { Borrow } from './entities/borrow.entity';
// import { CreateBorrowDto } from './dto/create-borrow.dto';
// import { BorrowStatus } from './dto/borrow.model';
// import { BooksService } from 'src/books/books.service';
// import { BorrowersService } from 'src/borrowers/borrowers.service';

// @Injectable()
// export class BorrowRepository extends Repository<Borrow> {
//   constructor(
//     private dataSource: DataSource,
//     private borrowersService: BorrowersService,
//     private booksService: BooksService,
//   ) {
//     super(Borrow, dataSource.createEntityManager());
//   }

//   async createBorrow({
//     borrower_id,
//     borrow_date,
//     book_id,
//     return_date,
//   }: CreateBorrowDto): Promise<Borrow> {
//     const borrower = await this.borrowersService.getBorrowersById(borrower_id);

//     const book = await this.booksService.getBookById(book_id);

//     const borrow = this.create({
//       borrow_date,
//       return_date,
//       status: BorrowStatus.ACTIVE, 
//     });
//     borrow.borrower = borrower;
//     borrow.book = book;
//     await this.save(borrow);

//     return borrow;
//   }
// }


import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Borrow } from './entities/borrow.entity';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { BorrowStatus } from './dto/borrow.model';
import { BorrowersService } from '../borrowers/borrowers.service'; // Adjust the import path if necessary
import { BooksService } from 'src/books/books.service';

@Injectable()
export class BorrowRepository extends Repository<Borrow> {
  constructor(
    private dataSource: DataSource,
    private borrowersService: BorrowersService,
    private booksService: BooksService,
  ) {
    super(Borrow, dataSource.createEntityManager());
  }

  async createBorrow({
    borrower_id,
    borrow_date,
    book_id,
    return_date,
  }: CreateBorrowDto): Promise<Borrow> {
    const borrower = await this.borrowersService.getBorrowersById(borrower_id);

    const book = await this.booksService.getBookById(book_id);

    const borrow = this.create({
      borrow_date,
      return_date,
      status: BorrowStatus.ACTIVE, // or any default status
    });
    borrow.borrower = borrower;
    borrow.book = book;
    await this.save(borrow);

    return borrow;
  }
}
