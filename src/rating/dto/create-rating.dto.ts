// src/rating/dto/create-rating.dto.ts
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  Max,
  MinLength,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsString()
  artisanId: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  rating?: number;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Comment must be at least 10 characters long' })
  comment?: string;

  @ValidateIf((o) => !o.rating && !o.comment)
  @IsNotEmpty({ message: 'Either rating or comment must be provided' })
  atLeastOne?: any;
}
