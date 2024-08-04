import { Injectable } from '@nestjs/common';
import { BorrowRepository } from './borrow.repository';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { Borrow } from './entities/borrow.entity';

@Injectable()
export class BorrowService {
  constructor(private readonly borrowRepository: BorrowRepository) {}

  async createBorrow(createBorrowDto: CreateBorrowDto): Promise<Borrow> {
    return await this.borrowRepository.createBorrow(createBorrowDto);
  }
}
