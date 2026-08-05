/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../auth/guard/roles.guard'
import { RequiredRoles } from '../auth/decorator/roles.decorator'
import { RoleEnum } from '../auth/enum/role.enum'
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger'
import { CurrentUser } from './dto/user.decorator'

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) 
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto, @CurrentUser() user: any) {
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
  } 
@Patch(':id/role')
@ApiBody({ schema: { type: 'object', properties: { role: { type: 'string', enum: Object.values(RoleEnum) } } } })
  updateRole(@Param('id') id: string, @Body('role') role: string) {
    return this.usersService.updateRole(+id, role)
  }
  @Get(':id')
  @RequiredRoles(RoleEnum.Admin, RoleEnum.User)
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
}