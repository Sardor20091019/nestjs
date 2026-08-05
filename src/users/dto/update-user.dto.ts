import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
  IsOptional,
} from 'class-validator';
import { RoleEnum } from '../../auth/enum/role.enum';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[^<>]+$/, { message: 'Characters like < and > are not allowed' })
  @IsOptional()
  username!: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsOptional()
  email!: string;

  @IsNumber()
  @IsNotEmpty()
  age!: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsOptional()
  password!: string;

  @IsOptional()
  role!: RoleEnum.User | RoleEnum.Admin;
}
