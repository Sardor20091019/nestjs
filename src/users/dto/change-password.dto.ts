import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class changePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(32, { message: 'Password must be 32 characters long at max' })
  password!: string;
}
