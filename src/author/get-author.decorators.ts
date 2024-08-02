import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Author } from './entities/author.entity';

export const GetAuthorWithBooks = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authorId = request.params.authorId;

    const authorRepository = getRepository(Author);
    const author = await authorRepository.findOne({
      where: { Id: authorId },
      relations: ['books'],
    });

    if (!author) {
      throw new Error('Author not found');
    }

    return author;
  },
);
