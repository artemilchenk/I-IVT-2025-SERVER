import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GalleriesPaginationDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;
}
