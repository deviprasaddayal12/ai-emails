import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class PaginationParams {
  @ApiProperty()
  @Min(0)
  currentListSize: number = 0;

  @ApiProperty()
  @Min(0)
  @Max(50)
  noOfItems: number = 10;
}
