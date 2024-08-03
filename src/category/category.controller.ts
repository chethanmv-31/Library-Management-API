import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  createBindings(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async getCategory(): Promise<Category[]> {
    return await this.categoryService.getCategory();
  }

  @Get('/:id')
  getCategoryById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Delete('/:id')
  deleteBindingById(@Param('id') id: number): Promise<string> {
    return this.categoryService.deleteCategoryById(id);
  }

  @Patch('/:id')
  updateCategoryById(
    @Param('id') id: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategoryById(id, createCategoryDto);
  }
}
