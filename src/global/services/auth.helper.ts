import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { Request } from 'express';

const TAG = 'auth.helper';

@Injectable()
export class AuthHelper {
  constructor(private configService: ConfigService) {}

  public async getTokenFromRequest(request: Request): Promise<string> {
    try {
      // console.log(`${TAG}.getTokenFromRequest: ${JSON.stringify(request)}`);
      return request.headers.authorization.split(' ')[1];
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  public async createJwtToken(userId: string) {
    // const privateKey = fs.readFileSync(
    //   this.configService.get('JWT_PRIVATE_KEY_PATH'),
    // );

    const token = await jwt.sign(
      { authUserId: userId },
      // privateKey,
      this.configService.get('JWT_KEY'),
      {
        expiresIn: this.configService.get('JWT_EXPIRY'),
        // algorithm: 'RS256',
      },
    );
    return token;
  }

  public async verifyAndDecodeJwtToken(token: string) {
    // var cert = fs.readFileSync(this.configService.get('JWT_PUBLIC_KEY_PATH'));
    try {
      const payload = await jwt.verify(
        token,
        // cert,
        this.configService.get('JWT_KEY'),
        // { algorithms: ['RS256'] },
      );
      // console.log(`${TAG}.verifyAndDecodeJwtToken: ${JSON.stringify(payload)}`);
      return payload;
    } catch (ex) {
      throw new UnauthorizedException(ex.message);
    }
  }

  public async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  public async verifyPassword(
    enteredPassword: string,
    savedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, savedPassword);
  }
}
