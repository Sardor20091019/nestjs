import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  @IsNumber()
  limit: number = 10;
}
