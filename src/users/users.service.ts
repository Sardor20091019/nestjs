/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepo } from './users.repo';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UserRepo) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.repo.selectByUsername(
      createUserDto.username,
    );
    if (existingUser) {
      throw new BadRequestException({
        error: 'Bad Request',
        statuscode: 400,
        message: 'User with this username already exists',
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    const userWithHashedPassword = {
      ...createUserDto,
      password: hashedPassword,
    };

    const newUser = await this.repo.create(userWithHashedPassword);
    return newUser;
  }

  async findAll(page: number, limit: number) {
    const { data, total } = await this.repo.list(page, limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateRole(params: { id: number; role: string }) {
    const { role, id } = params;
    const updatedUser = await this.repo.updateRole(id, role);
    return updatedUser;
  }

  async findOne(id: number) {
    const user = await this.repo.findOne(id);
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.repo.selectByUsername(username);
    return user;
  }

  async update(id: number, updateUserDto: any, requestingUser: any) {
    if (updateUserDto.role) {
      const requesterRole = requestingUser?.role
        ? String(requestingUser.role).toLowerCase()
        : '';
      const adminRole = 'admin';

      if (requesterRole !== adminRole) {
        throw new ForbiddenException(
          'Only administrators can change user roles.',
        );
      }
    }

    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltRounds,
      );
    }

    const currentUserId = requestingUser?.id ?? requestingUser?.sub;

    return this.repo.update(id, updateUserDto, currentUserId);
  }
  async remove(id: number) {
    return await this.repo.remove(id);
  }
}
