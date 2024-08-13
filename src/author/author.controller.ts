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
import { RolesGuard } from 'src/auth/guards/role-auth.guard';
import { Roles } from 'src/auth/guards/role.decorator';
import { Role } from 'src/auth/roles.model';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/guards/get-user.decorator';
@ApiTags('Author')
@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}
  private logger = new Logger('Author Controller');

  @Get()
  @Roles(Role.ADMIN, Role.STUDENT, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllAuthors(): Promise<Author[]> {
    return this.authorService.getAllAuthor();
  }

  @Post('/create')
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
    @GetUser() user: User,
  ): Promise<Author> {
    return this.authorService.createAuthor(createAuthorDto, user);
  }

  @Get('/:id')
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAuthorById(@Param('id') id: number): Promise<Author> {
    return this.authorService.getAuthorById(id);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteAuthorById(@Param('id') id: number): Promise<string> {
    return this.authorService.deleteAuthorById(id);
  }

  @Patch('/:id')
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateAuthorById(
    @Param('id') id: number,
    @Body() updateAuthorDto: CreateAuthorDto,
    @GetUser() user: User,
  ): Promise<Author> {
    return this.authorService.updateAuthorById(id, updateAuthorDto, user);
  }
}
