import { IsNotEmpty, Min } from 'class-validator';

export class PaginationDto {
  @IsNotEmpty()
  @Min(1)
  page: number = 1;

  @IsNotEmpty()
  @Min(1)
  limit: number = 10;
}
