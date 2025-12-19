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
import { ArtisanSpecialty } from 'src/enum/specialty.enum';

export class CreateArtisanDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @IsNotEmpty()
  @IsArray()
  @IsEnum(ArtisanSpecialty, { each: true })
  @ArrayUnique()
  specialty: ArtisanSpecialty[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  linkOfSocialMedia?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsNumber()
  @IsNotEmpty()
  experience: number;
}
