import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    user: User,
  ): Promise<Category> {
    const { category_name } = createCategoryDto;

    const category = this.create({ category_name });
    category.created_at = new Date();
    category.created_by = user.id;
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
    const query = this.createQueryBuilder('category');
    const categories = await query.getMany();
    return categories;
  }
}
