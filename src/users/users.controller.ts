/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Body,
  Param,
  UseGuards,
  Post,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CheckIfAdminGuard,
  //  CheckIfAccessingTheIrOwnInfoGuard,
  RolesGuard,
} from '../auth/guard/roles.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CheckIfAdminOrAccessingTheIrOwnInfoGuard } from '../auth/guard/roles.guard';
import { PaginationDto } from './dto/pagination.dto';
import { findbyidDto } from './dto/find-by-id.dto';
import { setroleDto } from './dto/set-role.dto';
import { changePasswordDto } from './dto/change-password.dto';
import { RemoveByIdDto } from './dto/remove-by-id.dto';

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

  @Post('set-role')
  @UseGuards(JwtAuthGuard, CheckIfAdminGuard)
  @ApiBody({ type: setroleDto })
  updateRole(@Body() setroleDto: setroleDto) {
    return this.usersService.updateRole(setroleDto);
  }

  @Post('find-by-id')
  @ApiBody({ type: findbyidDto })
  findOne(@Body() findbyidDto: findbyidDto) {
    return this.usersService.findOne(findbyidDto.id);
  }

  @Post('change-my-password')
  @ApiBody({ type: changePasswordDto })
  changeMyPassword(
    @Body() changePasswordDto: changePasswordDto,
    @Req() req: any,
  ) {
    return this.usersService.changeMyPassword(
      req.user.id,
      changePasswordDto.password,
    );
  }

  @Post('update/:id')
  @UseGuards(JwtAuthGuard, CheckIfAdminOrAccessingTheIrOwnInfoGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
  ) {
    const requestingUser = req.user;
    return this.usersService.update(id, updateUserDto, requestingUser);
  }
  @Post('remove')
  @UseGuards(JwtAuthGuard, CheckIfAdminGuard)
  remove(@Body() RemoveByIdDto: RemoveByIdDto) {
    return this.usersService.remove(RemoveByIdDto.id, RemoveByIdDto);
  }
}
