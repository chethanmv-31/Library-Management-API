import { CreateBorrowersDto } from './dto/create-borrowers.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Borrowers } from './entities/borrowers.entity';
import { BorrowersRepository } from './borrowers.repository';
import { UpdateBorrowerStatus } from './dto/update-borrower-status.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class BorrowersService {
  constructor(private readonly borrowersRepository: BorrowersRepository) {}

  async getAllBorrowers(): Promise<Borrowers[]> {
    return await this.borrowersRepository.getAllBorrowers();
  }

  async createBorrowers(
    createBorrowersDto: CreateBorrowersDto,
    user: User,
  ): Promise<Borrowers> {
    return await this.borrowersRepository.createBorrowers(
      createBorrowersDto,
      user,
    );
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

  async getBorrowDataByUserId(id: string): Promise<Borrowers[]> {
    const found = await this.borrowersRepository.find({
      where: { borrower:{id: id} },
      // relations: ['user'],
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
    const { actual_Return_Date, borrowed_From, borrowed_TO } =
      createBorrowersDto;
    // borrowers.borrower_name = borrower_name;
    borrowers.actual_Return_Date = actual_Return_Date;
    borrowers.borrowed_From = borrowed_From;
    borrowers.borrowed_TO = borrowed_TO;
    this.borrowersRepository.save(borrowers);

    return borrowers;
  }

  async updateBorrowerStatus(
    id: number,
    borrowerStatus: UpdateBorrowerStatus,
    user: User,
  ): Promise<Borrowers> {
    const borrowers = await this.getBorrowersById(id);
    const { status } = borrowerStatus;
    borrowers.status = status;
    borrowers.issued_by = user;
    this.borrowersRepository.save(borrowers);
    return borrowers;
  }
}
