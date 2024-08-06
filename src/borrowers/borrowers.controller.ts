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
// import { GetUser } from 'src/auth/get-user.decorators';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('borrowers')
export class BorrowersController {
  constructor(private borrowersService: BorrowersService) {}

  // @Post()
  // createBorrowers(
  //   @Body()
  //   createBorrowersDto: CreateBorrowersDto,
  //   @GetUser() user: User,
  // ): Promise<Borrowers> {
  //   return this.borrowersService.createBorrowers(createBorrowersDto, user);
  // }

  @Get()
  getAllBorrowers(): Promise<Borrowers[]> {
    return this.borrowersService.getAllBorrowers();
  }

  @Get('/:id')
  getBorrowersById(@Param('id') id: number): Promise<Borrowers> {
    return this.borrowersService.getBorrowersById(id);
  }

  @Delete('/:id')
  deleteBorrowersById(@Param('id') id: number): Promise<string> {
    return this.borrowersService.deleteBorrowersById(id);
  }

  @Patch('/:id')
  updateBorrowersById(
    @Param('id') id: number,
    @Body() createBorrowersDto: CreateBorrowersDto,
  ): Promise<Borrowers> {
    return this.borrowersService.updateBorrowersById(id, createBorrowersDto);
  }

  @Patch('/status/:id')
  updateBorrowersStatus(
    @Param('id') id: number,
    @Body() updateBorrowersStock: UpdateBorrowerStatus,
  ): Promise<Borrowers> {
    return this.borrowersService.updateBorrowerStatus(id, updateBorrowersStock);
  }
 
}
