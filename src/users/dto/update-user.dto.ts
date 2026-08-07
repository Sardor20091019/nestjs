import {
  IsEmail,
  IsString,
  Matches,
  IsEmpty,
  IsOptional,
  IsInt,
  Max,
  Min,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Matches(/^[^<>]+$/, { message: 'Characters like < and > are not allowed' })
  @IsOptional()
  username?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email!: string;

  @IsInt()
  @IsOptional()
  @Min(5, { message: 'You must be at least 6 yo to use our site properly' })
  @Max(100, { message: 'You must be max 99 yo to use our site properly' })
  age!: number;

  @IsEmpty({
    message: `password can't be changed here, try changing your password at /users/change-my-password`,
  })
  @IsOptional()
  password?: string;
}
