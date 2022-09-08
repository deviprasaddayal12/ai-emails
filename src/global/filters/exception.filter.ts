import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import {
  createAuthorizationFailureResponse,
  createBadRequestResponse,
  createInternalFailureResponse,
} from '../response/response.helper';

const TAG = 'exception.filter';

@Catch(UnauthorizedException, BadRequestException, HttpException, Error)
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(@Inject() private configService: ConfigService) {}

  catch(
    exception: HttpException | BadRequestException | UnauthorizedException,
    host: ArgumentsHost,
  ) {
    console.log(TAG);
    console.log(exception);
    return this.getCustomError(exception, host);
  }

  private getCustomError(
    exception: HttpException | BadRequestException | UnauthorizedException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();

    try {
      let status = exception.getStatus();
      let error;

      if (exception instanceof UnauthorizedException)
        error = createAuthorizationFailureResponse();
      else {
        status = 200;
        if (exception.getResponse() instanceof Object)
          error = createBadRequestResponse(exception.getResponse()['message']);
        else
          error = createBadRequestResponse(exception.getResponse().toString());
      }
      response.status(status).json(error);
    } catch (error) {
      response.status(500).json(createInternalFailureResponse());
    }
  }
}
