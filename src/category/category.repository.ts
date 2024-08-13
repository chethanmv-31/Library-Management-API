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

    const category = this.create({ category_name });
    category.createdAt = new Date();
    try {
      await this.save(category);
    } catch (error) {
      if (error.code == '23505') {
        throw new ConflictException('Category already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return category;
  }

  async getAllCategory(): Promise<Category[]> {
    const query = this.createQueryBuilder('category').leftJoinAndSelect(
      'category.books',
      'book',
    );
    const categories = query.getMany();
    return categories;
  }
}
