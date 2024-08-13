import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Publisher } from './entities/publisher.entity';
import { PublisherRepository } from './publisher.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PublisherService {
  constructor(private readonly publisherRepository: PublisherRepository) {}

  async getAllPublisher(): Promise<Publisher[]> {
    return await this.publisherRepository.getAllPublisher();
  }

  async getPublisherById(id: number): Promise<Publisher> {
    const found = await this.publisherRepository.findOne({
      where: { id: id },
    });

    if (!found) {
      throw new NotFoundException(
        `Publisher is not found with this id '${id}'`,
      );
    }
    return found;
  }

  async createPublisher(
    createPublisherDto: CreatePublisherDto,
  ): Promise<Publisher> {
    return await this.publisherRepository.createPublisher(createPublisherDto);
  }

  async deletePublisherById(id: number): Promise<string> {
    const result = await this.publisherRepository.delete({
      id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Publisher not found with this id "${id}"`);
    }

    return 'Delete success';
  }

  async updatePublisherById(
    id: number,
    createPublisherDto: CreatePublisherDto,
  ): Promise<Publisher> {
    const publisher = await this.getPublisherById(id);
    const { publisher_name } = createPublisherDto;
    publisher.publisher_name = publisher_name;
    publisher.createdAt = new Date();

    this.publisherRepository.save(publisher);
    return publisher;
  }
}
