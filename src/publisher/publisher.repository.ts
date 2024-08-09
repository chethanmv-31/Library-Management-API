import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Publisher } from './entities/publisher.entity';
import { CreatePublisherDto } from './dto/create-publisher.dto';

@Injectable()
export class PublisherRepository extends Repository<Publisher> {
  constructor(private dataSource: DataSource) {
    super(Publisher, dataSource.createEntityManager());
  }

  async createPublisher(
    createPublisherDto: CreatePublisherDto,
  ): Promise<Publisher> {
    const { publisher_name } = createPublisherDto;
    const publisher = this.create({ publisher_name });
    await this.save(publisher);

    return publisher;
  }

  async getAllPublisher(): Promise<Publisher[]> {
    const query = this.createQueryBuilder('publisher').leftJoinAndSelect(
      'publisher.books',
      'book',
    );
    const publisher = await query.getMany();
    return publisher;
  }
}
