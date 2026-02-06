import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNumber,
  IsEnum,
  IsOptional,
  IsNotEmpty,
  IsArray,
  ArrayUnique,
} from 'class-validator';
import { ArtisanCity } from 'src/enum/city.enum';
import { ArtisanSpecialty } from 'src/enum/specialty.enum';

export class ArtisanSignUpDto {
  @ApiProperty({
    example: 'user0312',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'artisan@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password1234',
    minLength: 6,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: '555404040',
  })
  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @ApiProperty({
    description: 'List of artisan specialties',
    isArray: true,
    enum: ArtisanSpecialty,
    example: [ArtisanSpecialty.PLUMBER, ArtisanSpecialty.ELECTRICIAN],
  })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(ArtisanSpecialty, { each: true })
  @ArrayUnique()
  specialty: ArtisanSpecialty[];

  @ApiProperty({
    example:
      'Experienced electrician specializing in residential wiring and repairs',
    description: 'Short description of the artisan and their services',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'https://www.linkedin.com/in/nikoloz-kapanadze-05b714377/',
    required: false,
  })
  @IsOptional()
  @IsString()
  linkOfSocialMedia?: string;

  @ApiProperty({
    required: false,
    example: 'avatars/2088750c-7a01-4cd8-a544-12af2dc8bd0b.jpeg',
  })
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  experience: number;

  @ApiProperty({
    enum: ArtisanCity,
    example: ArtisanCity.TBILISI,
  })
  @IsString()
  @IsEnum(ArtisanCity)
  @IsNotEmpty()
  city: string;
}
