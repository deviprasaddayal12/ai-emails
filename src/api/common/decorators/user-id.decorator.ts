import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Constants } from 'src/global/config/consts.config';

export const AuthUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const authUserId = context.switchToHttp().getRequest().authUserId;
    console.log('AuthUserId.decorator', authUserId);
    return authUserId;
  },
);
