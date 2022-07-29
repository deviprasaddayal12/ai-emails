import { Injectable } from '@nestjs/common';
import { ClientResponse } from '@sendgrid/mail';
import { EmailService } from 'src/global/services/emails.service';

@Injectable()
export class AppService {
  constructor(private readonly emailService: EmailService) {}

  async getHello(): Promise<[ClientResponse, {}]> {
    return await this.emailService.send({
      from: 'dayal.das@utkallabs.com',
      to: 'deviprasaddayal12@gmail.com',
      subject: 'first sendgrid email',
      text: 'this is test text',
      html: 'this is test html',
    });
  }
}
