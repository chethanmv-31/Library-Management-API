import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { BookStock } from './dto/books.model';
import { UpdateBookSStock } from './dto/update-book-stock.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateAuthorDto } from 'src/author/dto/create-author.dto';
import { CreateBindingDto } from 'src/binding/dto/create-binding.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/roles.model';
import { Roles } from 'src/auth/guards/role.decorator';
import { RolesGuard } from 'src/auth/guards/role-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { S3Service } from 'src/s3Service';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/guards/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  private logger = new Logger('BookController');
  constructor(
    private booksService: BooksService,
    private readonly s3Service: S3Service,
  ) {}

  @Get()
  @Roles(Role.STUDENT)
  @Roles(Role.ADMIN)
  @Roles(Role.CLERK)
  @Roles(Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('/:id')
  @Roles(Role.ADMIN, Role.STUDENT, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getBookById(@Param('id') id: string): Promise<Book> {
    return this.booksService.getBookById(id);
  }

  @Post()
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  
  async createBook(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() image: Express.Multer.File,
    @GetUser() user: User,
  ): Promise<Book> {
    let imageUrl: string;
    if (image) {
      imageUrl = await this.s3Service.uploadFile(image, 'book-images');
    }
    return this.booksService.createBook(createBookDto, imageUrl || null, user);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteBookById(@Param('id') id: string): Promise<string> {
    return this.booksService.deleteBookById(id);
  }

  @Patch('/:id/stock')
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateBookStock(
    @Param('id') id: string,
    @Body() updateBookStock: UpdateBookSStock,
    @GetUser() user: User,

  ): Promise<Book> {
    const { stock } = updateBookStock;
    return this.booksService.updateBookStock(id, stock,user);
  }

  @Patch('/:id')
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Body() updateAuthorDto: CreateAuthorDto,
    @GetUser() user: User,

  ): Promise<Book> {
    return this.booksService.updateBook(id, updateBookDto,user);
  }

  @Post(':id/upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  @UseInterceptors(FileInterceptor('image'))
  async uploadBookImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,

  ) {
    const imageUrl = await this.s3Service.uploadFile(file, 'book-images');
    return this.booksService.updateBookImage(id, imageUrl, user);
  }
}
