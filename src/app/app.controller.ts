import { Controller, Get, Post } from '@nestjs/common';
import { ClientResponse } from '@sendgrid/mail';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async ping(): Promise<String> {
    return await this.appService.ping();
  }

  @Post('/testEmail')
  async testEmail(): Promise<[ClientResponse, {}]> {
    return await this.appService.sendTestEmail();
  }
}
