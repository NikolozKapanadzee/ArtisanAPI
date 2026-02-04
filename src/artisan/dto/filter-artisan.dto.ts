import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { ArtisanCity } from 'src/enum/city.enum';
import { ArtisanSpecialty } from 'src/enum/specialty.enum';

export class FilterArtisanDto {
  @ApiPropertyOptional({
    description: 'Filter by artisan specialties (multiple allowed)',
    isArray: true,
    enum: ArtisanSpecialty,
    example: [ArtisanSpecialty.PLUMBER, ArtisanSpecialty.ELECTRICIAN],
  })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsEnum(ArtisanSpecialty, { each: true })
  specialty?: ArtisanSpecialty[];

  @ApiPropertyOptional({
    description: 'Filter by city',
    enum: ArtisanCity,
    example: ArtisanCity.TBILISI,
  })
  @IsOptional()
  @IsEnum(ArtisanCity)
  city?: ArtisanCity;
}
