import { Global, Module } from '@nestjs/common';
import { EmailService } from './services/emails.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class GlobalModule {}
