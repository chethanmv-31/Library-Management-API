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
      where: { Id: id },
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

  async deleteAuthorById(id: number): Promise<string> {
    const result = await this.authorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Author with id "${id}" is not found!`);
    }
    if (result.affected === 1) {
      return `Delete Success`;
    }
  }

  async updateAuthorById(
    id: number,
    createAuthorDto: CreateAuthorDto,
  ): Promise<Author> {
    const found = await this.getAuthorById(id);
    if (!found) {
      throw new NotFoundException(`Author with id "${id}" is not found!`);
    } else {
      found.author_Name = createAuthorDto.author_Name;
      this.authorRepository.save(found);
      return found;
    }
  }
}
