import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { AuthResponse } from './dtos/auth.response';
import {
  ForgotPasswordRequest,
  SendOtpRequest,
  SignInRequest,
  SignUpRequest,
  VerifyOtpRequest,
} from './dtos/auth.request';
import { AuthHelper } from 'src/global/services/auth.helper';
import { Messages } from 'src/global/config/consts.config';

const TAG = 'auth.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authHelper: AuthHelper,
  ) {}

  public async signIn(signInRequest: SignInRequest): Promise<AuthResponse> {
    const user = await this.userService.findByEmailWithPassword(
      signInRequest.email,
    );
    if (user === null)
      throw new BadRequestException(Messages.Auth.MSG_EMAIL_NOT_REGISTERED);

    const isPasswordOk = await this.authHelper.verifyPassword(
      signInRequest.password,
      user.password,
    );
    if (!isPasswordOk) {
      throw new BadRequestException(Messages.Auth.MSG_WRONG_PASSWORD);
    }

    const token = await this.authHelper.createJwtToken(user._id);
    return { user, token };
  }

  public async forgotPassword(
    forgotPasswordRequest: ForgotPasswordRequest,
  ): Promise<string> {
    const user = await this.userService.findByEmailWithPassword(
      forgotPasswordRequest.email,
    );
    if (user === null)
      throw new BadRequestException(Messages.User.ERR_NOT_EXIST);

    return user._id;
  }

  public async signUp(signUpRequest: SignUpRequest): Promise<AuthResponse> {
    const user = await this.userService.findByEmail(signUpRequest.email);
    if (user !== null)
      throw new BadRequestException(Messages.Auth.MSG_EMAIL_REGISTERED_ALREADY);

    const hashedPassword = await this.authHelper.hashPassword(
      signUpRequest.password,
    );

    const signedUpUser = await this.userService.signUpUser({
      fullName: signUpRequest.fullName,
      dateOfBirth: signUpRequest.dateOfBirth,
      gender: signUpRequest.gender,
      email: signUpRequest.email,
      phone: signUpRequest.phone,
      organisation: signUpRequest.organisation,
      password: hashedPassword,
    });
    signedUpUser.password = null;
    const token = await this.authHelper.createJwtToken(signedUpUser._id);

    return { user: signedUpUser, token: token };
  }

  public async sendOtp(sendOtpRequest: SendOtpRequest) {}

  public async verifyOtp(verifyOtpRequest: VerifyOtpRequest) {}
}
