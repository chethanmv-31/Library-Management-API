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
import { RolesGuard } from 'src/auth/guards/role-auth.guard';
import { Roles } from 'src/auth/guards/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/auth/roles.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bindings')
@Controller('binding')
export class BindingController {
  constructor(private bindingService: BindingService) {}
  @Post()
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createBindings(@Body() createBindingDto: CreateBindingDto): Promise<Binding> {
    return this.bindingService.createBindings(createBindingDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.STUDENT, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllBindings(): Promise<Binding[]> {
    return this.bindingService.getAllBindings();
  }

  @Get('/:id')
  @Roles(Role.ADMIN, Role.STUDENT, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getBindingById(@Param('id') id: number): Promise<Binding> {
    return this.bindingService.getBindingById(id);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteBindingById(@Param('id') id: number): Promise<string> {
    return this.bindingService.deleteBindingById(id);
  }

  @Patch('/:id')
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateBindingById(
    @Param('id') id: number,
    @Body() createBindingDto: CreateBindingDto,
  ): Promise<Binding> {
    return this.bindingService.updateBindingById(id, createBindingDto);
  }
}
