/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MinLength, IsEmpty } from 'class-validator'
import { RoleEnum } from '../../auth/enum/role.enum'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[^<>]+$/, { message: 'Characters like < and > are not allowed' })
  username!: string
  
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string
  
  @IsNumber()
  @IsNotEmpty()
  age!: number  
  
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string

  @IsEmpty()
  role?: RoleEnum
}