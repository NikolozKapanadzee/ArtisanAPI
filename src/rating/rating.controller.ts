import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Get,
  Put,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { IsUserAuthGuard } from '../guard/IsUserAuthGuard.guard';
import { UserId } from '../decorator/user.decorator';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingService } from './rating.service';

@ApiTags('ratings')
@ApiBearerAuth()
@Controller('ratings')
@UseGuards(IsUserAuthGuard)
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rating/comment for an artisan' })
  @ApiBody({ type: CreateRatingDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Rating created successfully',
    schema: {
      example: {
        _id: '6984a21f023449c13adfebbf',
        userId: '6984a21f023449c13adfebb0',
        artisanId: '6984a21f023449c13adfebb1',
        rating: 4.5,
        comment: 'Great craftsman, excellent quality work!',
        createdAt: '2026-02-05T13:58:55.753Z',
        updatedAt: '2026-02-05T13:58:55.753Z',
        __v: 0,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Either rating or comment must be provided, or user already rated this artisan',
    schema: {
      example: {
        statusCode: 400,
        message:
          'You have already rated/commented on this artisan. Use update instead.',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
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
  @ApiOperation({ summary: "Get current user's rating history" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all ratings made by the current user',
    schema: {
      example: [
        {
          _id: '6984a21f023449c13adfebbf',
          userId: '6984a21f023449c13adfebb0',
          artisanId: {
            _id: '6984a21f023449c13adfebb1',
            name: 'John Smith',
            specialty: 'Carpenter',
            avatarUrl: 'https://example.com/avatar.jpg',
          },
          rating: 4.5,
          comment: 'Great craftsman, excellent quality work!',
          createdAt: '2026-02-05T13:58:55.753Z',
          updatedAt: '2026-02-05T13:58:55.753Z',
          __v: 0,
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  async getMyRatingHistory(@UserId() userId: string) {
    return this.ratingService.getUserRatingHistory(userId);
  }

  @Put(':ratingId')
  @ApiOperation({ summary: 'Update an existing rating/comment' })
  @ApiParam({
    name: 'ratingId',
    description: 'MongoDB ObjectId of the rating',
    example: '6984a21f023449c13adfebbf',
  })
  @ApiBody({ type: UpdateRatingDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rating updated successfully',
    schema: {
      example: {
        _id: '6984a21f023449c13adfebbf',
        userId: '6984a21f023449c13adfebb0',
        artisanId: '6984a21f023449c13adfebb1',
        rating: 5,
        comment: 'Updated: Truly exceptional work!',
        createdAt: '2026-02-05T13:58:55.753Z',
        updatedAt: '2026-02-05T14:30:00.000Z',
        __v: 0,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Rating not found or user does not have permission, or no data provided',
    schema: {
      example: {
        statusCode: 400,
        message: 'Rating not found or you do not have permission to update it',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
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
  @ApiOperation({ summary: 'Delete a rating/comment' })
  @ApiParam({
    name: 'ratingId',
    description: 'MongoDB ObjectId of the rating',
    example: '6984a21f023449c13adfebbf',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rating deleted successfully',
    schema: {
      example: {
        message: 'Rating deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Rating not found or user does not have permission',
    schema: {
      example: {
        statusCode: 400,
        message: 'Rating not found or you do not have permission to delete it',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  async deleteRating(
    @Param('ratingId') ratingId: string,
    @UserId() userId: string,
  ) {
    return this.ratingService.deleteRating(ratingId, userId);
  }

  @Get('artisan/:artisanId')
  @ApiOperation({ summary: 'Get all ratings for a specific artisan' })
  @ApiParam({
    name: 'artisanId',
    description: 'MongoDB ObjectId of the artisan',
    example: '6984a21f023449c13adfebb1',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all ratings for the specified artisan',
    schema: {
      example: [
        {
          _id: '6984a21f023449c13adfebbf',
          userId: {
            _id: '6984a21f023449c13adfebb0',
            email: 'user@gmail.com',
          },
          artisanId: '6984a21f023449c13adfebb1',
          rating: 4.5,
          comment: 'Great craftsman, excellent quality work!',
          createdAt: '2026-02-05T13:58:55.753Z',
          updatedAt: '2026-02-05T13:58:55.753Z',
          __v: 0,
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authenticated',
  })
  async getArtisanRatings(@Param('artisanId') artisanId: string) {
    return this.ratingService.getArtisanRatingHistory(artisanId);
  }
}
