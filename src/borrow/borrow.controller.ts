import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { Borrow } from './entities/borrow.entity';
import { BorrowService } from './borrow.service';

@Controller('borrow')
export class BorrowController {
    constructor(private borrowService: BorrowService) {}

    @Post()
    createBorrow(
      @Body()
      createBorrowDto: CreateBorrowDto,
    ): Promise<Borrow> {
      return this.borrowService.createBorrow(createBorrowDto);
    }
  
    // @Get()
    // getAllBorrowers(): Promise<Borrow[]> {
    //   return this.borrowService.getAllBorrowers();
    // }
  
}
