import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { PublisherRepository } from './publisher.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entity';

@Module({
  providers: [PublisherService, PublisherRepository],
  imports: [TypeOrmModule.forFeature([Publisher])],
  controllers: [PublisherController],
})
export class PublisherModule {}
