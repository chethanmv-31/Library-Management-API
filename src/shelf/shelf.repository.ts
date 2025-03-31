import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Shelf } from './entities/shelf.entity';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ShelfRepository extends Repository<Shelf> {
  constructor(private dataSource: DataSource) {
    super(Shelf, dataSource.createEntityManager());
  }
  async createShelf(
    createShelfDto: CreateShelfDto,
    user: User,
  ): Promise<Shelf> {
    const { Floor_No, Shelf_No } = createShelfDto;

    // Check if shelf already exists
    const existingShelf = await this.findOne({
      where: { Floor_No, Shelf_No }
    });

    if (existingShelf) {
      throw new BadRequestException(`Shelf already exists on floor ${Floor_No} with number ${Shelf_No}`);
    }

    const shelf = this.create({ Floor_No, Shelf_No });
    shelf.created_at = new Date();
    shelf.created_by = user.id;

    try {
      await this.save(shelf);
      return shelf;
    } catch (error) {
      throw new BadRequestException('Failed to create shelf. Please check your input.');
    }
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
