import { IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  author_Name: string;
}
