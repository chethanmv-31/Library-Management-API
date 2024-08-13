import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { Shelf } from './entities/shelf.entity';
import { UpdateShelfDto } from './dto/update-shelf.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/role-auth.guard';
import { Roles } from 'src/auth/guards/role.decorator';
import { Role } from 'src/auth/roles.model';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Shelf')
@Controller('shelf')
export class ShelfController {
  constructor(private shelfService: ShelfService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  createCategory(@Body() createShelfDto: CreateShelfDto): Promise<Shelf> {
    return this.shelfService.createShelf(createShelfDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CLERK, Role.STUDENT, Role.LIBRARIAN)
  async getCategory(): Promise<Shelf[]> {
    return await this.shelfService.getShelf();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CLERK, Role.STUDENT, Role.LIBRARIAN)
  getCategoryById(@Param('id') id: number): Promise<Shelf> {
    return this.shelfService.getShelfById(id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  deleteBindingById(@Param('id') id: number): Promise<string> {
    return this.shelfService.deleteShelfById(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  updateShelfById(
    @Param('id') id: number,
    @Body() updateShelfDto: UpdateShelfDto,
  ): Promise<Shelf> {
    return this.shelfService.updateShelfById(id, updateShelfDto);
  }
}
