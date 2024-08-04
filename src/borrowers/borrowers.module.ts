import { Module } from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { BorrowersController } from './borrowers.controller';
import { BorrowersRepository } from './borrowers.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrowers } from './entities/borrowers.entity';

@Module({
  providers: [BorrowersService, BorrowersRepository],
  controllers: [BorrowersController],
  imports: [TypeOrmModule.forFeature([Borrowers])],
  exports: [BorrowersService], // Make sure this line exists
})
export class BorrowersModule {}
