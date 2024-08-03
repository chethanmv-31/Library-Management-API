import { CategoryRepository } from './category.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryRepository.createCategory(createCategoryDto);
  }

  async getCategory(): Promise<Category[]> {
    return await this.categoryRepository.getAllCategory();
  }

  async getCategoryById(id: number): Promise<Category> {
    const found = await this.categoryRepository.findOne({
      where: { id: id },
    });

    if (!found) {
      throw new NotFoundException(`Category is not found with this id '${id}'`);
    }
    return found;
  }

  async deleteCategoryById(id: number): Promise<string> {
    const result = await this.categoryRepository.delete({
      id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Category not found with this id "${id}"`);
    }
    return 'Delete success';
  }

  async updateCategoryById(
    id: number,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = await this.getCategoryById(id);
    const { category_name } = createCategoryDto;
    category.category_name = category_name;
    this.categoryRepository.save(category);
    return category;
  }
}
