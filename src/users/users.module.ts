/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { AuthModule } from '../auth/auth.module'
import { UserRepo } from './users.repo'

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepo],
  exports: [UsersService],
})
export class UsersModule {}