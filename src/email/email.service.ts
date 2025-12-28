import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}
  async sendTextToSomeone(to, subject, content) {
    const options = {
      to,
      from: `<teamupts@gmail.com> Artisan`,
      subject,
      text: content,
    };

    await this.mailerService.sendMail(options);
  }
}
