import { IsEnum, IsNumber } from 'class-validator';
import { RoleEnum } from '../../auth/enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class setroleDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber({}, { message: 'ID must be a whole number' })
  id!: number;

  @ApiProperty({ enum: RoleEnum, example: RoleEnum.admin })
  @Type(() => Number)
  @IsEnum(RoleEnum, { message: 'Role must be 1 (admin) or 2 (user)' })
  role!: RoleEnum;
}
