import { Module } from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { ShelfController } from './shelf.controller';
import { ShelfRepository } from './shelf.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shelf } from './entities/shelf.entity';
import { Book } from 'src/books/entities/book.entity';

@Module({
  providers: [ShelfService, ShelfRepository],
  controllers: [ShelfController],
  imports:[TypeOrmModule.forFeature([Shelf,Book])]

})
export class ShelfModule {}
