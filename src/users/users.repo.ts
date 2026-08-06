/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
import * as bcrypt from 'bcrypt';

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
    const lowerRole = String(role).toLowerCase();
    if (!['admin', 'user'].includes(lowerRole)) {
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
        created_by: createdById || null,
      });
      // throw new InternalServerErrorException({
      //   message:
      //     'Error happened during transactions is working, so now task will stop now and rollback shouyld work, so the part you wanted to update is still hols the old value, and your new value isnt saved because of InternalServerException',
      //   statuscode: 500,
      //   error: InternalServerErrorException,
      //
      return updatedUser;
    });
  }

  async changePassword(id: number, nothashedNewPassword: string) {
    return db1.transaction(async (trx) => {
      const oldValues = await trx(this.tableName).where({ id }).first();
      if (!oldValues) {
        throw new BadRequestException('User not found');
      }

      const isSamePassword = await bcrypt.compare(
        nothashedNewPassword,
        oldValues.password,
      );

      if (isSamePassword) {
        throw new BadRequestException({
          message: `New Password can't be same as Old Password, so try tihinkning of  a new password`,
          statuscode: 400,
          error: BadRequestException,
        });
      }

      const hashedPassword = await bcrypt.hash(nothashedNewPassword, 10);

      const [updatedUser] = await trx(this.tableName)
        .where({ id })
        .update({ password: hashedPassword })
        .returning('*');

      await trx('user_changes').insert({
        main_id: id,
        old_values: JSON.stringify(oldValues),
        new_values: JSON.stringify(updatedUser),
        created_by: id,
      });

      // throw new InternalServerErrorException({
      //   message:
      //     'Error happened during transactions is working, so now task will stop now and rollback shouyld work, so the part you wanted to update is still hols the old value, and your new value isnt saved because of InternalServerException',
      //   statuscode: 500,
      //   error: InternalServerErrorException,
      // });
      return {
        message: 'Password successfully changed',
        id: updatedUser.id,
        username: updatedUser.username,
      };
    });
  }
  async remove(id: number) {
    const deletedRows = await db1(this.tableName).where({ id }).delete();
    return deletedRows > 0
      ? { deleted: true }
      : { message: ' there is no user id like tha' };
  }
}
