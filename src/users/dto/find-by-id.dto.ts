import { IsNotEmpty, IsNumber } from 'class-validator';

export class findbyidDto {
  @IsNotEmpty()
  @IsNumber(
    {},
    { message: 'ID must be NUMBER abd not any other caharacter you stupid ' },
  )
  id!: number;
}
