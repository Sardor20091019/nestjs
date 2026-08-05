/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  // InternalServerErrorException,
} from '@nestjs/common';
import { db1 } from '../shared/db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepo {
  private tableName = 'users';

  async selectByUsername(username: string) {
    const user = await db1(this.tableName).where({ username }).first();
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const [newUser] = await db1(this.tableName)
      .insert(createUserDto)
      .returning('*');
    return newUser;
  }

  async list(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const data = await db1(this.tableName)
      .select('*')
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db1(this.tableName).count('id as count');

    return {
      data,
      total: Number(count),
    };
  }

  async updateRole(id: number, role: string) {
    if (!['User', 'Admin', 'admin', 'user'].includes(role)) {
      throw new BadRequestException({
        statuscode: 400,
        message: "role must be either admin or user, and mustn't be left empty",
        error: 'Bad Request',
      });
    }

    const [updatedUser] = await db1(this.tableName)
      .where({ id })
      .update({ role })
      .returning('*');
    return updatedUser;
  }

  async findOne(id: number) {
    const user = await db1(this.tableName).where({ id }).first();
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, createdById?: number) {
    if (
      updateUserDto.role &&
      !['User', 'user', 'admin', 'Admin'].includes(updateUserDto.role)
    ) {
      throw new BadRequestException({
        statuscode: 400,
        message: "role must be either admin or user, and mustn't be left empty",
        error: 'Bad Request',
      });
    }

    return db1.transaction(async (trx) => {
      const oldValues = await trx(this.tableName).where({ id }).first();
      if (!oldValues) {
        throw new BadRequestException('User not found');
      }

      const [updatedUser] = await trx(this.tableName)
        .where({ id })
        .update(updateUserDto)
        .returning('*');

      await trx('user_changes').insert({
        main_id: id,
        old_values: JSON.stringify(oldValues),
        new_values: JSON.stringify(updatedUser),
        created_by: createdById,
      });
      // throw new InternalServerErrorException({
      //   message:
      //     'Error happened during transactions is working so now task will stop now and rollback shouyld work, so the part you wanted to update is still is old value',
      //   statuscode: 500,
      //   error: InternalServerErrorException,
      // });
      return updatedUser;
    });
  }

  async remove(id: number) {
    const deletedRows = await db1(this.tableName).where({ id }).delete();
    return deletedRows > 0 ? { deleted: true } : null;
  }
}
