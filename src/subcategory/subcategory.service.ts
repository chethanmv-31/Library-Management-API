import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createSubcategoryDto: CreateSubcategoryDto, userId: string) {
    return this.subcategoryRepository.manager.transaction(async transactionalEntityManager => {
      const existingSubcategory = await transactionalEntityManager
        .createQueryBuilder(Subcategory, 'subcategory')
        .leftJoinAndSelect('subcategory.category', 'category')
        .where('subcategory.subcategory_name = :name', { name: createSubcategoryDto.subcategory_name })
        .andWhere('category.id = :categoryId', { categoryId: createSubcategoryDto.categoryId })
        .getOne();

      if (existingSubcategory) {
        throw new ConflictException('Subcategory with this name already exists in this category');
      }

      const category = await transactionalEntityManager.findOne(Category, {
        where: { id: createSubcategoryDto.categoryId },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const subcategory = transactionalEntityManager.create(Subcategory, {
        ...createSubcategoryDto,
        category,
        created_at: new Date(),
        created_by: userId,
      });

      return transactionalEntityManager.save(Subcategory, subcategory);
    });
  }

  findAll() {
    return this.subcategoryRepository.find({
      relations: ['category', 'books'],
    });
  }

  async findOne(id: number) {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id },
      relations: ['category', 'books'],
    });

    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }

    return subcategory;
  }

  async update(id: number, updateSubcategoryDto: UpdateSubcategoryDto, userId: string) {
    if (updateSubcategoryDto.subcategory_name) {
      const currentSubcategory = await this.findOne(id);
      const targetCategoryId = updateSubcategoryDto.categoryId || currentSubcategory.category.id;

      const existingSubcategory = await this.subcategoryRepository
        .createQueryBuilder('subcategory')
        .leftJoinAndSelect('subcategory.category', 'category')
        .where('subcategory.subcategory_name = :name', { name: updateSubcategoryDto.subcategory_name })
        .andWhere('category.id = :categoryId', { categoryId: targetCategoryId })
        .andWhere('subcategory.id != :id', { id })
        .getOne();

      if (existingSubcategory) {
        throw new ConflictException('Subcategory with this name already exists in this category');
      }
    }

    const subcategory = await this.findOne(id);

    if (updateSubcategoryDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateSubcategoryDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      subcategory.category = category;
    }

    Object.assign(subcategory, {
      ...updateSubcategoryDto,
      updated_at: new Date(),
      updated_by: userId,
    });

    return this.subcategoryRepository.save(subcategory);
  }

  async remove(id: number) {
    const subcategory = await this.findOne(id);
    return this.subcategoryRepository.remove(subcategory);
  }
}