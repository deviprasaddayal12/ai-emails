import { ApiProperty } from '@nestjs/swagger';

export class Response<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}
