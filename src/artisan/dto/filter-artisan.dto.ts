import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { ArtisanSpecialty } from 'src/enum/specialty.enum';

export class FilterArtisanDto {
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsEnum(ArtisanSpecialty, { each: true })
  specialty?: ArtisanSpecialty[];
}
