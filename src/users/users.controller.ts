/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Body, Param, UseGuards, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { RequiredRoles } from '../auth/decorator/roles.decorator';
import { RoleEnum } from '../auth/enum/role.enum';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CheckIfAdminOrAccessingTheIrOwnInfoGuard } from '../auth/guard/roles.guard';
import { PaginationDto } from './dto/pagination.dto';
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users-list')
  @ApiBody({ type: PaginationDto })
  findAll(@Body() pagiantionDto: PaginationDto) {
    return this.usersService.findAll(pagiantionDto.page, pagiantionDto.limit);
  }

  @RequiredRoles(RoleEnum.Admin)
  @Post('set-role')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        role: { type: 'string', enum: Object.values(RoleEnum) },
      },
    },
  })
  updateRole(@Body() body: { id: number; role: string }) {
    return this.usersService.updateRole(body);
  }

  @Post('find-by-id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
      },
    },
  })
  findOne(@Body() body: { id: number }) {
    return this.usersService.findOne(Number(body.id));
  }

  @Post('update/:id')
  @UseGuards(JwtAuthGuard, CheckIfAdminOrAccessingTheIrOwnInfoGuard)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
  ) {
    const requestingUser = req.user;
    return this.usersService.update(+id, updateUserDto, requestingUser);
  }

  @Post('remove/:id')
  @RequiredRoles(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
