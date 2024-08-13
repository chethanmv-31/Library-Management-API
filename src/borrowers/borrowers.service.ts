import { CreateBorrowersDto } from './dto/create-borrowers.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    user: User,
  ): Promise<Borrowers> {
    const { actual_Return_Date, borrowed_From, borrowed_TO, borrower_name } =
      createBorrowersDto;
    const borrowers = await this.getBorrowersById(id);
    if (borrowers.status === 'RESERVED') {
      borrowers.borrower_name = borrower_name;
      borrowers.actual_Return_Date = actual_Return_Date;
      borrowers.borrowed_From = borrowed_From;
      borrowers.borrowed_TO = borrowed_TO;
      borrowers.updated_at = new Date();
      borrowers.updated_by = user.id;

      this.borrowersRepository.save(borrowers);
      return borrowers;
    } else {
      throw new ForbiddenException(
        'Not able to update the "ISSUED OR RETURNED" borrows',
      );
    }
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
    borrowers.updated_at = new Date();

    this.borrowersRepository.save(borrowers);
    return borrowers;
  }
}
