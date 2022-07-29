import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

const TAG = 'emails.service.ts';

@Global()
@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  async send(
    mail: SendGrid.MailDataRequired,
  ): Promise<[SendGrid.ClientResponse, {}]> {
    const transport = await SendGrid.send(mail);

    console.log(`${TAG}.send: `, `dispatch status: ${transport}`);
    return transport;
  }
}
