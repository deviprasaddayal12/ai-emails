import { Global, Module } from '@nestjs/common';
import { AuthHelper } from './services/auth.helper';
import { EmailService } from './services/emails.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [EmailService, AuthHelper],
  exports: [EmailService, AuthHelper],
})
export class GlobalModule {}
