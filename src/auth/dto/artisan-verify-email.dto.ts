import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class ArtisanVerifyEmailDto {
  @ApiProperty({
    example: 'artisan@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 870219,
  })
  @IsNumber()
  @IsNotEmpty()
  OTPCode: number;
}
