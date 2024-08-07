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
import { BindingService } from './binding.service';
import { Binding } from './entities/binding.entity';
import { CreateBindingDto } from './create-binding.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('binding')
export class BindingController {
  constructor(private bindingService: BindingService) {}
  @Post()
  @UseGuards(AuthGuard())
  createBindings(@Body() createBindingDto: CreateBindingDto): Promise<Binding> {
    return this.bindingService.createBindings(createBindingDto);
  }
  
  @Get()
  @UseGuards(AuthGuard())
  getAllBindings(): Promise<Binding[]> {
    return this.bindingService.getAllBindings();
  }
  @Get('/:id')
  @UseGuards(AuthGuard())
  getBindingById(@Param('id') id: number): Promise<Binding> {
    return this.bindingService.getBindingById(id);
  }
  
  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteBindingById(@Param('id') id: number): Promise<string> {
    return this.bindingService.deleteBindingById(id);
  }
  
  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateBindingById(
    @Param('id') id: number,
    @Body() createBindingDto: CreateBindingDto,
  ): Promise<Binding> {
    return this.bindingService.updateBindingById(id, createBindingDto);
  }
}
