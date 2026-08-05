/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
i
<<<<<<< HEAD
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common'
=======
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query,} from '@nestjs/common'
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../auth/guard/roles.guard'
import { RequiredRoles } from '../auth/decorator/roles.decorator'
import { RoleEnum } from '../auth/enum/role.enum'
<<<<<<< HEAD
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger'
=======
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger'
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
import { CurrentUser } from './dto/user.decorator'

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) 
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
<<<<<<< HEAD
  create(@Body() createUserDto: CreateUserDto, @CurrentUser() user: any) {
=======
  create(@Body() createUserDto: CreateUserDto,
  @CurrentUser() user: any) {
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
    createUserDto.role = user.role
    return this.usersService.create(createUserDto)
  }

  @RequiredRoles(RoleEnum.Admin)
  @Get() 
  @ApiQuery({ name: 'page', example: 1 })
  @ApiQuery({ name: 'limit', example: 10 })
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNumber = parseInt(page, 10)
    const limitNumber = parseInt(limit, 10)

    return this.usersService.findAll(pageNumber, limitNumber)
  }  // 1. password, 2. role,  role ->  enum type
  // login 
  // guard
  // exxtension - nestjs
  
  @Get(':id')
  @RequiredRoles(RoleEnum.Admin , RoleEnum.User)
9
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }
  @Patch(':id')

  @RequiredRoles(RoleEnum.Admin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @RequiredRoles(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
