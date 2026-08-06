import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  IsOptional,
  MaxLength,
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
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;

  @IsOptional()
  role!: RoleEnum.User | RoleEnum.Admin;
}
