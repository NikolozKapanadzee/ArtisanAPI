import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Rating } from './schema/rating.schema';
import mongoose, { Model, Mongoose } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { Artisan } from 'src/artisan/schema/artisan.schema';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name) private ratingModel: Model<Rating>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Artisan.name) private artisanModel: Model<Artisan>,
  ) {}
  async create(
    userId: string,
    artisanId: string,
    rating?: number,
    comment?: string,
  ) {
    if (!rating && !comment) {
      throw new BadRequestException(
        'Either rating or comment must be provided',
      );
    }
    const existingRating = await this.ratingModel.findOne({
      userId,
      artisanId,
    });
    if (existingRating) {
      throw new BadRequestException(
        'You have already rated/commented on this artisan. Use update instead.',
      );
    }
    const newRating = await this.ratingModel.create({
      userId: new mongoose.Types.ObjectId(userId),
      artisanId,
      rating,
      comment,
    });
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { ratingHistory: newRating._id },
    });
    await this.artisanModel.findByIdAndUpdate(artisanId, {
      $push: { ratingHistory: newRating._id },
    });
    return newRating;
  }

  findAll() {
    return `This action returns all rating`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
