import {
  IsOptional,
  IsNumber,
  IsString,
  Min,
  Max,
  MinLength,
} from 'class-validator';

export class UpdateRatingDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  rating?: number;

  @IsOptional()
  @IsString()
  @MinLength(4)
  comment?: string;
}
