/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RoleEnum } from './enum/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(createUserDto: any) {
    const username = createUserDto.username || createUserDto.name;

    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('Username already taken');
    }

    const newUser = await this.usersService.create({
      ...createUserDto,
      role: RoleEnum.User,
    });

    const { password, age, email, ...result } = newUser;

    return {
      message: 'User registered successfully',
      user: result,
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isPasswordMatch = await bcrypt.compare(pass, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const { password, ...result } = user;
    return result;
  }

  login(user: any) {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }
}
