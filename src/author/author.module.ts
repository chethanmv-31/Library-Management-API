import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { AuthorRepository } from './author.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Author]), AuthModule],
  providers: [AuthorService, AuthorRepository],
  controllers: [AuthorController],
})
export class AuthorModule {}
