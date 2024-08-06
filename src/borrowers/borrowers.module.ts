import { Module } from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { BorrowersController } from './borrowers.controller';
import { BorrowersRepository } from './borrowers.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrowers } from './entities/borrowers.entity';
import { BooksModule } from 'src/books/books.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [BorrowersService, BorrowersRepository],
  controllers: [BorrowersController],
  imports: [TypeOrmModule.forFeature([Borrowers]), BooksModule, AuthModule],
})
export class BorrowersModule {}
