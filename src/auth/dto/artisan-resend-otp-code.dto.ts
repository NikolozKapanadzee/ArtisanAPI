import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ArtisanResendOTPCodeDto {
  @ApiProperty({
    example: 'artisan@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
