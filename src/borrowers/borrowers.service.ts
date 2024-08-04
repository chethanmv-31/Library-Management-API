import { CreateBorrowersDto } from './dto/create-borrowers.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Borrowers } from './entities/borrowers.entity';
import { BorrowersRepository } from './borrowers.repository';

@Injectable()
export class BorrowersService {
  constructor(
    private readonly borrowersRepository: BorrowersRepository,
  ) {}

  async getAllBorrowers(): Promise<Borrowers[]> {
    return await this.borrowersRepository.getAllBorrowers();
  }

  async createBorrowers(
    createBorrowersDto: CreateBorrowersDto,
  ): Promise<Borrowers> {
    return await this.borrowersRepository.createBorrowers(createBorrowersDto);
  }

 
  async getBorrowersById(id: number): Promise<Borrowers> {
    const found = await this.borrowersRepository.findOne({
      where: { id: id },
    });

    if (!found) {
      throw new NotFoundException(
        `Borrowers is not found with this id '${id}'`,
      );
    }
    return found;
  }

  async deleteBorrowersById(id: number): Promise<string> {
    const result = await this.borrowersRepository.delete({
      id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Borrowers not found with this id "${id}"`);
    }

    return 'Delete success';
  }

  async updateBorrowersById(
    id: number,
    createBorrowersDto: CreateBorrowersDto,
  ): Promise<Borrowers> {
    const borrowers = await this.getBorrowersById(id);
    const {
      actual_Return_Date,
      borrowed_From,
      borrowed_TO,
      issued_by,
      borrower_name,
    } = createBorrowersDto;
    borrowers.borrower_name = borrower_name;
    borrowers.actual_Return_Date = actual_Return_Date;
    borrowers.issued_by = issued_by;
    borrowers.borrowed_From = borrowed_From;
    borrowers.borrowed_TO = borrowed_TO;
    this.borrowersRepository.save(borrowers);
    return borrowers;
  }
}
