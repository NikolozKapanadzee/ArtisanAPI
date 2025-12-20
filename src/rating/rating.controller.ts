import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ArtisanId } from 'src/decorator/artisan.decorator';
import { UserId } from 'src/decorator/user.decorator';
import { IsUserAuthGuard } from 'src/guard/IsUserAuthGuard.guard';

@Controller('rating')
@UseGuards(IsUserAuthGuard)
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  create(
    @Body() createRatingDto: CreateRatingDto,
    @UserId()
    userId,
  ) {
    return this.ratingService.create(
      userId,
      createRatingDto.artisanId,
      createRatingDto.rating,
      createRatingDto.comment,
    );
  }

  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.update(+id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }
}
