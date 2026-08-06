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
import { RemoveByIdDto } from './dto/remove-by-id.dto';

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

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
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
    if (!updateUserDto.role) {
      const requesterRole = requestingUser?.role
        ? String(requestingUser.role).toLowerCase()
        : '';

      if (requesterRole !== 'admin') {
        throw new ForbiddenException('Only admins can change user roles.');
      }
    }

    const currentUserId = requestingUser?.id;

    return this.repo.update(id, updateUserDto, currentUserId);
  }

  async changeMyPassword(id: number, newPassword: string) {
    return this.repo.changePassword(id, newPassword);
  }

  async remove(id: number, RemoveByIdDto: RemoveByIdDto) {
    console.log(RemoveByIdDto);
    return await this.repo.remove(id);
  }
}
