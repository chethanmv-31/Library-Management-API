import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowController } from './borrow.controller';
import { BorrowService } from './borrow.service';
import { BorrowRepository } from './borrow.repository';
import { Borrow } from './entities/borrow.entity';
import { BorrowersModule } from '../borrowers/borrowers.module'; // Import the BorrowersModule
import { BooksModule } from 'src/books/books.module';

@Module({
  controllers: [BorrowController],
  providers: [BorrowService, BorrowRepository],
  imports: [
    TypeOrmModule.forFeature([Borrow]),
    BorrowersModule, // Add this line
    BooksModule
  ],
})
export class BorrowModule {}
