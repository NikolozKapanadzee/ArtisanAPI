import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { ArtisanCity } from 'src/enum/city.enum';
import { ArtisanSpecialty } from 'src/enum/specialty.enum';

export class FilterArtisanDto {
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsEnum(ArtisanSpecialty, { each: true })
  specialty?: ArtisanSpecialty[];

  @IsOptional()
  @IsEnum(ArtisanCity)
  city?: ArtisanCity;
}
