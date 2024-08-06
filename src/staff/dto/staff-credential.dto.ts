import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class StaffCredentialDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  staff_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too week',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, {
    message: 'Invalid email address',
  })
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  is_admin: boolean;

  @IsNotEmpty()
  @IsString()
  designation: string;
}
