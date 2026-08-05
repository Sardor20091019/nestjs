/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRepo } from './users.repo'
<<<<<<< HEAD
import * as bcrypt from 'bcrypt'
=======
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539

@Injectable()
export class UsersService {
  constructor(private readonly repo: UserRepo) {}

  async create(createUserDto: CreateUserDto) {
<<<<<<< HEAD
    const existingUser = await this.repo.selectByUsername(createUserDto.username)
=======
    const existingUser = await this.repo.selectByEmail(createUserDto.email)
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
    if (existingUser) {
      throw new BadRequestException({
        error:BadRequestException,
        statuscode: 400,
        message: 'User with this username already exists'
      })
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds)
    const userWithHashedPassword = { ...createUserDto, password: hashedPassword }

    const newUser = await this.repo.create(userWithHashedPassword)
        message: 'User with this email already exists'
      })
    }
    const newUser = await this.repo.create(createUserDto)
    return newUser
  }
  
  async findAll(page: number, limit: number) {
    const { data, total } = await this.repo.list(page, limit)

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

<<<<<<< HEAD
async updateRole(id: number, role: string) {
    const updatedUser = await this.repo.updateRole(id, role)
    return updatedUser || null
  } 

=======
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
async findOne(id: number) {
    const user = await this.repo.findOne(id);
    return user || null;
  }

<<<<<<< HEAD
async findByUsername(username: string) {
    const user = await this.repo.selectByUsername(username)
    return user || null
  }
=======

>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
  async update(id: number, updateUserDto: UpdateUserDto) {
    const updated = await this.repo.update(id, updateUserDto)
    return updated || null
  }

  async remove(id: number) {
    return await this.repo.remove(id)
  }

}