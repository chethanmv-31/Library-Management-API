import { DataSource, Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(private dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  async getAllAuthors(): Promise<Author[]> {
    const query = this.createQueryBuilder();
    const books = await query.getMany();
    return books;
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const { author_Name } = createAuthorDto;
    const author = this.create({ author_Name });
    await this.save(author);

    return author;
  }
}