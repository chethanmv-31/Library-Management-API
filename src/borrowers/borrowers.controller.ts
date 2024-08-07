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

@Controller('borrowers')
export class BorrowersController {
  constructor(private borrowersService: BorrowersService) {}

  @Post()
  @UseGuards(AuthGuard())
  createBorrowers(
    @Body()
    createBorrowersDto: CreateBorrowersDto,
    @GetUser() user: User,
  ): Promise<Borrowers> {
    return this.borrowersService.createBorrowers(createBorrowersDto, user);
  }
  
  @Get()
  @UseGuards(AuthGuard())
  getAllBorrowers(): Promise<Borrowers[]> {
    return this.borrowersService.getAllBorrowers();
  }
  
  @Get('/:id')
  @UseGuards(AuthGuard())
  getBorrowersById(@Param('id') id: number): Promise<Borrowers> {
    return this.borrowersService.getBorrowersById(id);
  }
  
  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteBorrowersById(@Param('id') id: number): Promise<string> {
    return this.borrowersService.deleteBorrowersById(id);
  }
  
  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateBorrowersById(
    @Param('id') id: number,
    @Body() createBorrowersDto: CreateBorrowersDto,
  ): Promise<Borrowers> {
    return this.borrowersService.updateBorrowersById(id, createBorrowersDto);
  }

  @Patch('/status/:id')
  @UseGuards(AuthGuard())
  updateBorrowersStatus(
    @Param('id') id: number,
    @Body() updateBorrowersStock: UpdateBorrowerStatus,
  ): Promise<Borrowers> {
    return this.borrowersService.updateBorrowerStatus(id, updateBorrowersStock);
  }
 
}
