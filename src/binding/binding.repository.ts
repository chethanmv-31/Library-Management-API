import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Binding } from './entities/binding.entity';
import { CreateBindingDto } from './create-binding.dto';

@Injectable()
export class BindingRepository extends Repository<Binding> {
  constructor(private dataSource: DataSource) {
    super(Binding, dataSource.createEntityManager());
  }

  async createBinding(createBindingDto: CreateBindingDto): Promise<Binding> {
    const { binding_name } = createBindingDto;
    const binding = this.create({ binding_name });
    await this.save(binding);

    return binding;
  }

  async getAllBindings(): Promise<Binding[]> {
    const query = await this.createQueryBuilder();
    const bindings = query.getMany();
    return bindings;
  }
}
