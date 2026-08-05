/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
<<<<<<< HEAD
import { UserRepo } from './users.repo'

@Module({
  imports: [], 
  controllers: [UsersController],
  providers: [UsersService, UserRepo],
  exports: [UsersService],
=======
import { AuthModule } from '../auth/auth.module'
import { UserRepo } from './users.repo'


@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepo],
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
})
export class UsersModule {}