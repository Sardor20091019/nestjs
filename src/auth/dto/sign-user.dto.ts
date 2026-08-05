<<<<<<< HEAD
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateUserDto {  
  @IsString()
  @IsNotEmpty()
  username!: string;

@IsString()
  @IsNotEmpty()
  password!: string;
=======
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  role?: string;
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
}
