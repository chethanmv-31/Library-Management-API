import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { Shelf } from './entities/shelf.entity';
import { UpdateShelfDto } from './dto/update-shelf.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('shelf')
export class ShelfController {
  constructor(private shelfService: ShelfService) {}

  @Post()
  @UseGuards(AuthGuard())
  createCategory(@Body() createShelfDto: CreateShelfDto): Promise<Shelf> {
    return this.shelfService.createShelf(createShelfDto);
  }
  
  @Get()
  @UseGuards(AuthGuard())
  async getCategory(): Promise<Shelf[]> {
    return await this.shelfService.getShelf();
  }
  
  @Get('/:id')
  @UseGuards(AuthGuard())
  getCategoryById(@Param('id') id: number): Promise<Shelf> {
    return this.shelfService.getShelfById(id);
  }
  
  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteBindingById(@Param('id') id: number): Promise<string> {
    return this.shelfService.deleteShelfById(id);
  }
  
  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateShelfById(
    @Param('id') id: number,
    @Body() updateShelfDto: UpdateShelfDto): Promise<Shelf>{
      return this.shelfService.updateShelfById(id, updateShelfDto);
    }
}
