import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorRepository } from './author.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { User } from 'src/auth/entities/user.entity';

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
      throw new NotFoundException(`Author is not found with this id '${id}'`);
    }
    return found;
  }

  async createAuthor(
    createAuthorDto: CreateAuthorDto,
    user: User,
  ): Promise<Author> {
    return this.authorRepository.createAuthor(createAuthorDto, user);
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
    user: User,
  ): Promise<Author> {
    const author = await this.getAuthorById(id);
    if (!author) {
      throw new NotFoundException(`Author with id "${id}" is not found!`);
    } else {
      author.author_Name = createAuthorDto.author_Name;
      author.updated_at = new Date();
      author.updated_by = user.id;

      this.authorRepository.save(author);
      return author;
    }
  }
}
