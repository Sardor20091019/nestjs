/* eslint-disable prettier/prettier */
<<<<<<< HEAD
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'
import { RoleEnum } from './enum/role.enum'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, 
    private readonly usersService: UsersService,
  ) {}


  async register(createUserDto: any) {
    const username = createUserDto.username || createUserDto.name

    const existingUser = await this.usersService.findByUsername(username)
    if (existingUser) {
      throw new BadRequestException('Username already taken')
    }

    const newUser = await this.usersService.create({
      ...createUserDto,
      role: RoleEnum.User, 
    })

    const { password, ...result } = newUser
    return result
  }
async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username)
    if (!user) {
      throw new UnauthorizedException('Invalid username or password')
    }
    const isPasswordMatch = await bcrypt.compare(pass, user.password)

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid username or password')
    }

    const { password, ...result } = user
    return result
  }


  login(user: any) {
    const payload = { 
      sub: user.id, 
      username: user.username, 
      role: user.role 
    }
    
=======
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from './dto/sign-user.dto'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(user: CreateUserDto) {
   const user: any = {}

      const payload = { role: user.role, id: user.id }
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
    return {
      access_token: this.jwtService.sign(payload),  
    }
  }
}