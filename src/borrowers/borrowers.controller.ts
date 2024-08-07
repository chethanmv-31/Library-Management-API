import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Borrowers } from './entities/borrowers.entity';
import { CreateBorrowersDto } from './dto/create-borrowers.dto';
import { BorrowersService } from './borrowers.service';
import { UpdateBorrowerStatus } from './dto/update-borrower-status.dto';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/guards/get-user.decorator';
import { RolesGuard } from 'src/auth/guards/role-auth.guard';
import { Roles } from 'src/auth/guards/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/auth/roles.model';

@Controller('borrowers')
export class BorrowersController {
  constructor(private borrowersService: BorrowersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.STUDENT)
  createBorrowers(
    @Body()
    createBorrowersDto: CreateBorrowersDto,
    @GetUser() user: User,
  ): Promise<Borrowers> {
    return this.borrowersService.createBorrowers(createBorrowersDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STUDENT, Role.CLERK, Role.LIBRARIAN)
  getAllBorrowers(): Promise<Borrowers[]> {
    return this.borrowersService.getAllBorrowers();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STUDENT, Role.CLERK, Role.LIBRARIAN)
  getBorrowersById(@Param('id') id: number): Promise<Borrowers> {
    return this.borrowersService.getBorrowersById(id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STUDENT, Role.CLERK, Role.LIBRARIAN)
  deleteBorrowersById(@Param('id') id: number): Promise<string> {
    return this.borrowersService.deleteBorrowersById(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STUDENT, Role.CLERK, Role.LIBRARIAN)
  updateBorrowersById(
    @Param('id') id: number,
    @Body() createBorrowersDto: CreateBorrowersDto,
  ): Promise<Borrowers> {
    return this.borrowersService.updateBorrowersById(id, createBorrowersDto);
  }

  @Patch('/status/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  updateBorrowersStatus(
    @Param('id') id: number,
    @Body() updateBorrowersStock: UpdateBorrowerStatus,
  ): Promise<Borrowers> {
    return this.borrowersService.updateBorrowerStatus(id, updateBorrowersStock);
  }
}
