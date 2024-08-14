import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Publisher } from './entities/publisher.entity';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PublisherRepository extends Repository<Publisher> {
  constructor(private dataSource: DataSource) {
    super(Publisher, dataSource.createEntityManager());
  }

  async createPublisher(
    createPublisherDto: CreatePublisherDto,
    user: User,
  ): Promise<Publisher> {
    const { publisher_name } = createPublisherDto;
    const publisher = this.create({ publisher_name });
    publisher.created_at = new Date();
    publisher.created_by = user.id;

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
