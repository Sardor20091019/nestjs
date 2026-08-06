import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveByIdDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber(
    {},
    { message: 'ID must be NUMBER abd not any other caharacter you stupid ' },
  )
  id!: number;
}
