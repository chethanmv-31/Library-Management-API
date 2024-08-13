import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Binding } from './entities/binding.entity';
import { CreateBindingDto } from './create-binding.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class BindingRepository extends Repository<Binding> {
  constructor(private dataSource: DataSource) {
    super(Binding, dataSource.createEntityManager());
  }

  async createBinding(
    createBindingDto: CreateBindingDto,
    user: User,
  ): Promise<Binding> {
    const { binding_name } = createBindingDto;
    const binding = this.create({ binding_name });
    binding.created_at = new Date();
    binding.created_by = user.id;

    await this.save(binding);

    return binding;
  }

  async getAllBindings(): Promise<Binding[]> {
    const query = this.createQueryBuilder('binding').leftJoinAndSelect(
      'binding.books',
      'book',
    );
    const bindings = await query.getMany();
    return bindings;
  }
}
