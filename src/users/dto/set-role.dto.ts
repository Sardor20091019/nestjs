import { IsEnum, IsInt } from 'class-validator';
import { RoleEnum } from '../../auth/enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class setroleDto {
  @ApiProperty({ example: 1 })
  @IsInt({ message: 'ID must be a whole number' })
  id!: number;

  @ApiProperty({ enum: RoleEnum, example: RoleEnum.admin })
  @IsEnum(RoleEnum, { message: 'Role must be 1 (admin) or 2 (user)' })
  role!: RoleEnum;
}
