import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: '6981aadcb439e87de161a30c',
  })
  @IsNotEmpty()
  @IsString()
  artisanId: string;

  @ApiProperty({
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  rating?: number;

  @ApiProperty({
    example: 'Good Service,I Recommend Him',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(4, { message: 'Comment must be at least 4 characters long' })
  comment?: string;

  @ValidateIf((o) => !o.rating && !o.comment)
  @IsNotEmpty({ message: 'Either rating or comment must be provided' })
  atLeastOne?: any;
}
