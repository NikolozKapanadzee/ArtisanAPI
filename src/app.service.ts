import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Injectable()
export class AppService {
  constructor(private emailService: EmailService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async sendEmail(to, subject, content) {
    await this.emailService.sendHtmlToSomeone(to, subject, content);
    console.log('first email send succ');
  }
}
