import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { Shelf } from './entities/shelf.entity';
import { UpdateShelfDto } from './dto/update-shelf.dto';

@Controller('shelf')
export class ShelfController {
  constructor(private shelfService: ShelfService) {}

  @Post()
  createCategory(@Body() createShelfDto: CreateShelfDto): Promise<Shelf> {
    return this.shelfService.createShelf(createShelfDto);
  }

  @Get()
  async getCategory(): Promise<Shelf[]> {
    return await this.shelfService.getShelf();
  }

  @Get('/:id')
  getCategoryById(@Param('id') id: number): Promise<Shelf> {
    return this.shelfService.getShelfById(id);
  }

  @Delete('/:id')
  deleteBindingById(@Param('id') id: number): Promise<string> {
    return this.shelfService.deleteShelfById(id);
  }

  @Patch('/:id')
  updateShelfById(
    @Param('id') id: number,
    @Body() updateShelfDto: UpdateShelfDto): Promise<Shelf>{
    return this.shelfService.updateShelfById(id, updateShelfDto);
  }
}
