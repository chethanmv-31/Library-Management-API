import { DataSource, Repository } from 'typeorm';
import { Borrowers } from './entities/borrowers.entity';
import { Injectable } from '@nestjs/common';
import { CreateBorrowersDto } from './dto/create-borrowers.dto';

@Injectable()
export class BorrowersRepository extends Repository<Borrowers> {
  constructor(private dataSource: DataSource) {
    super(Borrowers, dataSource.createEntityManager());
  }

  async getAllBorrowers(): Promise<Borrowers[]> {
    const query = this.createQueryBuilder();
    const borrow = await query.getMany();
    return borrow;
  }

  async createBorrowers(
    createBorrowersDto: CreateBorrowersDto,
  ): Promise<Borrowers> {
    const {
      // book_id,
      borrowed_From,
      borrowed_TO,
      borrower_name,
      issued_by,
      actual_Return_Date,
    } = createBorrowersDto;
    const borrowers = this.create({
      // book_id,
      borrowed_From,
      borrowed_TO,
      borrower_name,
      issued_by,
      actual_Return_Date,
    });
    
    
    await this.save(borrowers);

    return borrowers;
  }
}
