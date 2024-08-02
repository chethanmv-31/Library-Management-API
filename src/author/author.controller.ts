import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}
  private logger = new Logger('Author Controller');

  @Get()
  getAllAuthors(): Promise<Author[]> {
    return this.authorService.getAllAuthor();
  }

  @Post('/create')
  createAuthor(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    this.logger.verbose(
      `createAuthorDto called ${JSON.stringify(createAuthorDto)}`,
    );
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Get('/:id')
  getAuthorById(@Param('id') id: number): Promise<Author> {
    return this.authorService.getAuthorById(id);
  }
}
