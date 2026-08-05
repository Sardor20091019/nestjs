/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { db1 } from '../shared/db'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserRepo {
  private tableName = 'users'

<<<<<<< HEAD
  async selectByUsername(username: string) {
    const user = await db1(this.tableName).where({ username }).first()
=======
  async selectByEmail(email: string) {
    const user = await db1(this.tableName).where({ email }).first()
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
    return user || null
  }

  async create(createUserDto: CreateUserDto) {
    const [newUser] = await db1(this.tableName)
      .insert(createUserDto)
      .returning('*')
    return newUser
  }

  async list(page: number, limit: number) {
    const offset = (page - 1) * limit
    
    const data = await db1(this.tableName)
      .select('*')
      .limit(limit)
      .offset(offset)

    const [{ count }] = await db1(this.tableName).count('id as count')

    return {
      data,
      total: Number(count),
    }
  }
  
<<<<<<< HEAD
  async updateRole(id: number, role: string) {
    const [updatedUser] = await db1(this.tableName)
      .where({ id })
      .update({ role })
      .returning('*')
    return updatedUser || null
  }

=======
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
  async findOne(id: number) {
    const user = await db1(this.tableName).where({ id }).first()
    return user || null
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const [updatedUser] = await db1(this.tableName)
      .where({ id })
      .update(updateUserDto)
      .returning('*')
    return updatedUser || null
  }

  async remove(id: number) {
    const deletedRows = await db1(this.tableName)
      .where({ id })
      .delete()
    return deletedRows > 0 ? { deleted: true } : null
  }
}