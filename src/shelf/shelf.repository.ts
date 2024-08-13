import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Shelf } from './entities/shelf.entity';
import { CreateShelfDto } from './dto/create-shelf.dto';

@Injectable()
export class ShelfRepository extends Repository<Shelf> {
  constructor(private dataSource: DataSource) {
    super(Shelf, dataSource.createEntityManager());
  }
  async createShelf(CreateShelfDto: CreateShelfDto): Promise<Shelf> {
    const { Floor_No, Shelf_No } = CreateShelfDto;
    const Shelf = this.create({ Floor_No, Shelf_No });
    Shelf.createdAt = new Date();
    await this.save(Shelf);

    return Shelf;
  }

  async getAllShelf(): Promise<Shelf[]> {
    const query = this.createQueryBuilder('shelf').leftJoinAndSelect(
      'shelf.books',
      'book',
    );
    const shelf = await query.getMany();
    return shelf;
  }

}
