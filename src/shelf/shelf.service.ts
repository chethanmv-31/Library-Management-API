import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { Shelf } from './entities/shelf.entity';
import { ShelfRepository } from './shelf.repository';
import { UpdateShelfDto } from './dto/update-shelf.dto';

@Injectable()
export class ShelfService {
  constructor(private readonly shelfRepository: ShelfRepository) {}

  async createShelf(createShelfDto: CreateShelfDto): Promise<Shelf> {
    return await this.shelfRepository.createShelf(createShelfDto);
  }

  async getShelf(): Promise<Shelf[]> {
    return await this.shelfRepository.getAllShelf();
  }

  async getShelfById(id: number): Promise<Shelf> {
    const found = await this.shelfRepository.findOne({
      where: { id: id },
    });

    if (!found) {
      throw new NotFoundException(`Shelf is not found with this id '${id}'`);
    }
    return found;
  }

  async deleteShelfById(id: number): Promise<string> {
    const result = await this.shelfRepository.delete({
      id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Shelf not found with this id "${id}"`);
    }
    return 'Delete success';
  }

  async updateShelfById(
    id: number,
    updateShelfDto: UpdateShelfDto): Promise<Shelf> {
    const category = await this.getShelfById(id);
    const { Floor_No, Shelf_No } = updateShelfDto;
    category.Floor_No = Floor_No;
    category.Shelf_No = Shelf_No;
    this.shelfRepository.save(category);
    return category;
  }
}
