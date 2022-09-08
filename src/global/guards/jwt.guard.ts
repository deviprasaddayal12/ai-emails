import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Constants } from '../config/consts.config';
import { AuthHelper } from '../services/auth.helper';

const TAG = 'jwt.guard';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private authHelper: AuthHelper) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authorization = context.switchToHttp().getRequest()
      .headers.authorization;

    if (!authorization)
      throw new UnauthorizedException('Bearer token is missing!');

    return this.authHelper
      .verifyAndDecodeJwtToken((authorization as string).split(' ')[1])
      .then((payload) => {
        // console.log(payload);

        context.switchToHttp().getRequest().authUserId = payload.authUserId;
        console.log(
          'jwt.guard: ',
          context.switchToHttp().getRequest().authUserId,
        );
        return payload != null;
      })
      .catch((error) => {
        console.log(`${TAG}.canActivate: catch ${error}`);
        return false;
      });
  }
}
