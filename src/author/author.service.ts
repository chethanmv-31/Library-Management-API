import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorRepository } from './author.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(private authorRepository: AuthorRepository) {}

  async getAllAuthor(): Promise<Author[]> {
    return this.authorRepository.getAllAuthors();
  }

  async getAuthorById(id: number): Promise<Author> {
    const found = await this.authorRepository.findOne({
      where: { author_Id: id },
    });

    if (!found) {
      throw new NotFoundException(
        `Author is not available with this id '${id}'`,
      );
    }
    return found;
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorRepository.createAuthor(createAuthorDto);
  }
}
