import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { RolesGuard } from 'src/auth/guards/role-auth.guard';
import { Roles } from 'src/auth/guards/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/auth/roles.model';
import { CreateBindingDto } from 'src/binding/create-binding.dto';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Publisher } from './entities/publisher.entity';

@Controller('publisher')
export class PublisherController {
  constructor(private publisherService: PublisherService) {}
  @Post()
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createPublishers(@Body()  createPublisherDto: CreatePublisherDto,
): Promise<Publisher>  {
    return this.publisherService.createPublisher(createPublisherDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.STUDENT, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllPublishers(): Promise<Publisher[]> {
    return this.publisherService.getAllPublisher();
  }

  @Get('/:id')
  @Roles(Role.ADMIN, Role.STUDENT, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getPublisherById(@Param('id') id: number): Promise<Publisher> {
    return this.publisherService.getPublisherById(id);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deletePublisherById(@Param('id') id: number): Promise<string> {
    return this.publisherService.deletePublisherById(id);
  }

  @Patch('/:id')
  @Roles(Role.ADMIN, Role.CLERK, Role.LIBRARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updatePublisherById(
    @Param('id') id: number,
    @Body()  createPublisherDto: CreatePublisherDto,
): Promise<Publisher> {
    return this.publisherService.updatePublisherById(id, createPublisherDto);
  }
}
