import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { User } from '../models/user.schema';

export class CreateUserRequest extends OmitType(User, []) {}

export class UpdateUserRequest extends PartialType(User) {}

export class UpdatePasswordRequest extends PickType(User, ['password']) {
  @IsOptional()
  @IsNotEmpty()
  userId: string;
}
