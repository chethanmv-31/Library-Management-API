import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateStaffDto {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  staff_name: string;

  @IsBoolean()
  is_admin: boolean;

  @IsString()
  designation: string;
}

export class staffData {
  id: number;

  staff_name: string;

  email: string;

  is_admin: boolean;

  designation: string;
}
