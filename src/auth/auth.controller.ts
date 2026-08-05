/* eslint-disable prettier/prettier */
<<<<<<< HEAD
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common'
=======
import { Controller, Post, Body } from '@nestjs/common'
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/sign-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

<<<<<<< HEAD
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @Post('login')
  async login(@Body() body: CreateUserDto) {
    const user = await this.authService.validateUser(body.username, body.password)
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return this.authService.login(user)
=======
  @Post('login')
  login(@Body() body: CreateUserDto) {
    return this.authService.login(body)
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
  }
}