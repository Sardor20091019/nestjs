import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RoleEnum } from '../../auth/enum/role.enum';

export class setroleDto {
  @IsNumber(
    {},
    { message: 'ID must be NUMBER abd not any other caharacter you stupid ' },
  )
  id!: number;

  @IsNotEmpty()
  @IsString()
  role!: RoleEnum.Admin | RoleEnum.User;
}
