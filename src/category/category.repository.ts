import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { category_name } = createCategoryDto;
    const binding = this.create({ category_name });
    try {
      await this.save(binding);
    } catch (error) {
      if (error.code == '23505') {
        throw new ConflictException('Category already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return binding;
  }

  async getAllCategory(): Promise<Category[]> {
    const query = this.createQueryBuilder();
    const categories = query.getMany();
    return categories;
  }
}
