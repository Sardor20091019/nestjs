import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
  IsOptional,
  MaxLength,
  Max,
  Min,
} from 'class-validator';
import { RoleEnum } from '../../auth/enum/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  username!: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(5, { message: 'You must be at least 6 yo to use our site properly' })
  @Max(100, { message: 'You must be max 99 yo to use our site properly' })
  age!: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;

  @IsOptional()
  role!: RoleEnum.User | RoleEnum.Admin;
}
