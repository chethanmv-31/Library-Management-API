import { Injectable, NotFoundException } from '@nestjs/common';
import { BindingRepository } from './binding.repository';
import { Binding } from './entities/binding.entity';
import { CreateBindingDto } from './create-binding.dto';

@Injectable()
export class BindingService {
  constructor(private readonly bindingRepository: BindingRepository) {}

  async getAllBindings(): Promise<Binding[]> {
    return await this.bindingRepository.getAllBindings();
  }

  async getBindingById(id: number): Promise<Binding> {
    const found = await this.bindingRepository.findOne({
      where: { id: id },
    });

    if (!found) {
      throw new NotFoundException(`Binding is not found with this id '${id}'`);
    }
    return found;
  }

  async createBindings(createBindingDto: CreateBindingDto): Promise<Binding> {
    return await this.bindingRepository.createBinding(createBindingDto);
  }

  async deleteBindingById(id: number): Promise<string> {
    const result = await this.bindingRepository.delete({
      id,
    });

    return '';
  }

  async updateBindingById(
    id: number,
    createBindingDto: CreateBindingDto,
  ): Promise<Binding> {
    const binding = await this.getBindingById(id);
    const { binding_name } = createBindingDto;
    binding.binding_name = binding_name;
    this.bindingRepository.save(binding);
    return binding;
  }
}
