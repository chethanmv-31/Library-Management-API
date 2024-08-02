import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { AuthorRepository } from './author.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorService, AuthorRepository],
  controllers: [AuthorController],
})
export class AuthorModule {}
