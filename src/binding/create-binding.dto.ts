import { IsNotEmpty } from 'class-validator';

export class CreateBindingDto {
  @IsNotEmpty()
  binding_name: string;
}
