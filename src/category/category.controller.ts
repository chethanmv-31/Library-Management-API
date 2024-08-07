import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard())
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async getCategory(): Promise<Category[]> {
    return await this.categoryService.getCategory();
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getCategoryById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteCategoryById(@Param('id') id: number): Promise<string> {
    return this.categoryService.deleteCategoryById(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateCategoryById(
    @Param('id') id: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategoryById(id, createCategoryDto);
  }
}
