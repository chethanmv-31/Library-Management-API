import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BindingService } from './binding.service';
import { Binding } from './entities/binding.entity';
import { CreateBindingDto } from './create-binding.dto';

@Controller('binding')
export class BindingController {
  constructor(private bindingService: BindingService) {}
  @Post()
  createBindings(@Body() createBindingDto: CreateBindingDto): Promise<Binding> {
    return this.bindingService.createBindings(createBindingDto);
  }

  @Get()
  getAllBindings(): Promise<Binding[]> {
    return this.bindingService.getAllBindings();
  }
  @Get('/:id')
  getBindingById(@Param('id') id: number): Promise<Binding> {
    return this.bindingService.getBindingById(id);
  }

  @Delete('/:id')
  deleteBindingById(@Param('id') id: number): Promise<string> {
    return this.bindingService.deleteBindingById(id);
  }

  @Patch('/:id')
  updateBindingById(
    @Param('id') id: number,
    @Body() createBindingDto: CreateBindingDto,
  ): Promise<Binding> {
    return this.bindingService.updateBindingById(id, createBindingDto);
  }
}
