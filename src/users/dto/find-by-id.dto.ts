import { IsNotEmpty } from 'class-validator';

export class findbyidDto {
  @IsNotEmpty()
  id!: number;
}
