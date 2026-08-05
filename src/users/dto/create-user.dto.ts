/* eslint-disable prettier/prettier */
<<<<<<< HEAD
import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MinLength, IsEmpty } from 'class-validator'
=======
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber ,IsString, Matches } from 'class-validator'
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
import { RoleEnum } from '../../auth/enum/role.enum'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
<<<<<<< HEAD
  @Matches(/^[^<>]+$/, { message: 'Characters like < and > are not allowed' })
  username!: string
=======
  @Matches( /^[^<>]+$/, { message: 'Characters like < and > are not allowed'})
  name!: string
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
  
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string
  
  @IsNumber()
  @IsNotEmpty()
  age!: number  
  
<<<<<<< HEAD
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string

  @IsString()
  @IsEmpty()
  role?: RoleEnum
}
=======
  @IsEmpty()
  role?: RoleEnum
}
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
