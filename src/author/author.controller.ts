import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}
  private logger = new Logger('Author Controller');

  @Get()
  @UseGuards(AuthGuard())
  getAllAuthors(): Promise<Author[]> {
    return this.authorService.getAllAuthor();
  }

  @Post('/create')
  @UseGuards(AuthGuard())
  createAuthor(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getAuthorById(@Param('id') id: number): Promise<Author> {
    return this.authorService.getAuthorById(id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteAuthorById(@Param('id') id: number): Promise<string> {
    return this.authorService.deleteAuthorById(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateAuthorById(
    @Param('id') id: number,
    @Body() updateAuthorDto: CreateAuthorDto,
  ): Promise<Author> {
    return this.authorService.updateAuthorById(id, updateAuthorDto);
  }
}
