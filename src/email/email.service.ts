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

  async sendHtmlToSomeone(to, subject, content) {
    const options = {
      to,
      from: '"Artisan" <teamupts@gmail.com>',
      subject,
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>${subject}</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            }

            .wrapper {
              padding: 40px 20px;
            }

            .card {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 16px;
              padding: 40px 32px;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
              text-align: center;
            }

            .badge {
              display: inline-block;
              padding: 6px 14px;
              border-radius: 999px;
              background: #f1f5f9;
              color: #475569;
              font-size: 12px;
              font-weight: 600;
              letter-spacing: 0.5px;
              margin-bottom: 20px;
            }

            h1 {
              margin: 0;
              font-size: 32px;
              color: #0f172a;
              letter-spacing: -0.5px;
            }

            p {
              margin: 20px 0 0;
              font-size: 16px;
              color: #475569;
              line-height: 1.6;
            }

            .divider {
              margin: 32px auto;
              width: 60px;
              height: 4px;
              border-radius: 4px;
              background: linear-gradient(90deg, #6366f1, #22d3ee);
            }

            .footer {
              margin-top: 40px;
              font-size: 12px;
              color: #94a3b8;
            }
          </style>
        </head>

        <body>
          <div class="wrapper">
            <div class="card">
              <div class="badge">IMPORTANT</div>

              <h1>${subject}</h1>

              <div class="divider"></div>

              <p>
                ${content}
              </p>

              <div class="footer">
                © 2026 Artisan. All rights reserved.
              </div>
            </div>
          </div>
        </body>
      </html>

    `,
    };
    await this.mailerService.sendMail(options);
  }
}
