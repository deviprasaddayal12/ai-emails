import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { User } from '../../users/models/user.schema';

export class OtpRequest extends PickType(User, ['email']) {
  @IsNotEmpty()
  @IsNumber()
  otp: number;
}

export class SignInRequest extends PickType(User, ['email', 'password']) {}

export class ForgotPasswordRequest extends PickType(User, ['email']) {}

export class SignUpRequest extends PickType(User, [
  'fullName',
  'dateOfBirth',
  'gender',
  'organisation',
  'phone',
  'email',
  'password',
]) {}

export class SendOtpRequest extends PickType(OtpRequest, ['email']) {}

export class VerifyOtpRequest extends OtpRequest {}
