import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class ArtisanResendOTPCodeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
