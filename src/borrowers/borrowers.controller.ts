import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import { Borrowers } from './entities/borrowers.entity';
  import { CreateBorrowersDto } from './dto/create-borrowers.dto';
  import { BorrowersService } from './borrowers.service';
  
  @Controller('borrowers')
  export class BorrowersController {
    constructor(private borrowersService: BorrowersService) {}
  
    @Post()
    createBorrowers(
      @Body()
      createBorrowersDto: CreateBorrowersDto,
    ): Promise<Borrowers> {
      return this.borrowersService.createBorrowers(createBorrowersDto);
    }
  
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
  }
  