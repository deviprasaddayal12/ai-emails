import { Controller, Body, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponse } from './dtos/auth.response';
import {
  ForgotPasswordRequest,
  SendOtpRequest,
  VerifyOtpRequest,
  SignInRequest,
  SignUpRequest,
} from './dtos/auth.request';
import { Response } from 'src/global/response/response.dto';
import {
  createDataResponse,
  createMessageResponse,
} from 'src/global/response/response.helper';

const TAG = 'auth.controller';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Method to sign-in to the app
   * @param email #required registered email of the user
   * @param password #required password of the user
   * @returns ResponseDto with AuthResponse as data
   */
  @Post('signIn')
  @ApiOkResponse({
    description: 'User and token data',
    type: AuthResponse,
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  async signIn(
    @Body() signInRequest: SignInRequest,
  ): Promise<Response<AuthResponse>> {
    const response = await this.authService.signIn(signInRequest);
    delete response.user.password; // remove password from response

    return createDataResponse<AuthResponse>(
      "You've successfully logged-in.",
      response,
    );
  }

  /**
   * Method to initiate a password-reset
   * @example
   * @param forgotPasswordRequest
   * @returns
   */
  @Post('forgotPassword')
  @ApiOkResponse({
    description: 'User id as data',
    type: String,
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  async forgotPassword(
    @Body() forgotPasswordRequest: ForgotPasswordRequest,
  ): Promise<Response<String>> {
    const response = await this.authService.forgotPassword(
      forgotPasswordRequest,
    );

    return createMessageResponse(response);
  }

  /**
   * Method to create a new emplyee using fewer mandatory details
   * @example
   * @param signUpRequest
   * @returns
   */
  @Post('signUp')
  @ApiOkResponse({
    description: 'User and token data',
    type: AuthResponse,
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  async signUp(
    @Body() signUpRequest: SignUpRequest,
  ): Promise<Response<AuthResponse>> {
    const response = await this.authService.signUp(signUpRequest);

    return createDataResponse<AuthResponse>(
      "You've successfully signed-up.",
      response,
    );
  }

  /**
   * Method to request a new otp to the specified destination (currently not operational)
   * @example
   * @param sendOtpRequest
   * @returns
   */
  @Post('sendOtp')
  @ApiOkResponse({
    description: 'Message whether the otp has been sent',
    type: String,
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  async sendOtp(
    @Body() sendOtpRequest: SendOtpRequest,
  ): Promise<Response<String>> {
    const response = await this.authService.sendOtp(sendOtpRequest);

    return createMessageResponse('Otp has been successfully sent.');
  }

  /**
   * Method to verify otp sent to the specified destination (currently not operational)
   * @example
   * @param verifyOtpRequest
   * @returns
   */
  @Post('verifyOtp')
  @ApiOkResponse({
    description: 'Message whether the otp has been sent',
    type: String,
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  async verifyOtp(
    @Body() verifyOtpRequest: VerifyOtpRequest,
  ): Promise<Response<String>> {
    const response = await this.authService.verifyOtp(verifyOtpRequest);

    return createMessageResponse('Otp has been successfully verified.');
  }
}
