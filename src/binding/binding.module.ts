import { Module } from '@nestjs/common';
import { BindingController } from './binding.controller';
import { BindingService } from './binding.service';
import { BindingRepository } from './binding.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Binding } from './entities/binding.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BindingController],
  providers: [BindingService, BindingRepository],
  imports: [TypeOrmModule.forFeature([Binding]), AuthModule],
})
export class BindingModule {}
