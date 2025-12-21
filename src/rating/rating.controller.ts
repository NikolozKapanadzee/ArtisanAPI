import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { IsUserAuthGuard } from '../guard/IsUserAuthGuard.guard';
import { UserId } from '../decorator/user.decorator';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingService } from './rating.service';

@Controller('ratings')
@UseGuards(IsUserAuthGuard)
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async createRating(
    @Body() createRatingDto: CreateRatingDto,
    @UserId() userId: string,
  ) {
    return this.ratingService.create(
      userId,
      createRatingDto.artisanId,
      createRatingDto.rating,
      createRatingDto.comment,
    );
  }

  @Get('my-history')
  async getMyRatingHistory(@UserId() userId: string) {
    return this.ratingService.getUserRatingHistory(userId);
  }

  @Put(':ratingId')
  async updateRating(
    @Param('ratingId') ratingId: string,
    @Body() updateRatingDto: UpdateRatingDto,
    @UserId() userId: string,
  ) {
    return this.ratingService.updateRating(
      ratingId,
      userId,
      updateRatingDto.rating,
      updateRatingDto.comment,
    );
  }

  @Delete(':ratingId')
  async deleteRating(
    @Param('ratingId') ratingId: string,
    @UserId() userId: string,
  ) {
    return this.ratingService.deleteRating(ratingId, userId);
  }

  @Get('artisan/:artisanId')
  async getArtisanRatings(@Param('artisanId') artisanId: string) {
    return this.ratingService.getArtisanRatingHistory(artisanId);
  }
}
