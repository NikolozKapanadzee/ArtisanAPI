import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendOtpCode(to: string, otpCode: number) {
    const options = {
      to,
      from: '"Artisan" <teamupts@gmail.com>',
      subject: 'Your OTP Verification Code',
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <style>
            body {
              margin: 0;
              padding: 0;
              background: #f0f2f5;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            }

            .wrapper {
              padding: 40px 20px;
            }

            .card {
              max-width: 500px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 12px;
              padding: 40px 32px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
              text-align: center;
            }

            .header {
              font-size: 24px;
              font-weight: 700;
              color: #0f172a;
              margin-bottom: 20px;
            }

            .instruction {
              font-size: 16px;
              color: #475569;
              margin-bottom: 30px;
            }

            .otp {
              display: inline-block;
              background: #6366f1;
              color: #ffffff;
              font-size: 28px;
              font-weight: 700;
              letter-spacing: 6px;
              padding: 12px 24px;
              border-radius: 8px;
              margin-bottom: 30px;
            }

            .footer {
              font-size: 12px;
              color: #94a3b8;
              margin-top: 20px;
            }

            .note {
              font-size: 14px;
              color: #64748b;
              margin-top: 10px;
            }
          </style>
        </head>

        <body>
          <div class="wrapper">
            <div class="card">
              <div class="header">Your OTP Code</div>
              <div class="instruction">
                Use the following code to verify your account. It will expire in 3 minutes.
              </div>

              <div class="otp">${otpCode}</div>

              <div class="note">
                If you did not request this, please ignore this email.
              </div>

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
