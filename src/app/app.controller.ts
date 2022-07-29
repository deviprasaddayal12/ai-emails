import { Controller, Get } from '@nestjs/common';
import { ClientResponse } from '@sendgrid/mail';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<[ClientResponse, {}]> {
    return await this.appService.getHello();
  }
}
