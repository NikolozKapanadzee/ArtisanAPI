import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class ArtisanVerifyEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  OTPCode: number;
}
