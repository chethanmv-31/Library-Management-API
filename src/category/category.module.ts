import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  providers: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
  imports: [TypeOrmModule.forFeature([Category])],
})
export class CategoryModule {}
