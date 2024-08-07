import { Module } from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { ShelfController } from './shelf.controller';
import { ShelfRepository } from './shelf.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shelf } from './entities/shelf.entity';
import { Book } from 'src/books/entities/book.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ShelfService, ShelfRepository],
  controllers: [ShelfController],
  imports:[TypeOrmModule.forFeature([Shelf,Book]),AuthModule]

})
export class ShelfModule {}
