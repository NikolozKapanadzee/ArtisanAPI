import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Rating } from './schema/rating.schema';
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
      userId: new mongoose.Types.ObjectId(userId),
      artisanId: new mongoose.Types.ObjectId(artisanId),
    });

    if (existingRating) {
      throw new BadRequestException(
        'You have already rated/commented on this artisan. Use update instead.',
      );
    }

    const newRating = await this.ratingModel.create({
      userId: new mongoose.Types.ObjectId(userId),
      artisanId: new mongoose.Types.ObjectId(artisanId),
      rating,
      comment,
    });
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { ratingHistory: newRating._id },
    });

    await this.artisanModel.findByIdAndUpdate(artisanId, {
      $push: { ratingHistory: newRating._id },
    });

    if (rating) {
      await this.updateArtisanAverageRating(artisanId);
    }

    return newRating;
  }

  async updateRating(
    ratingId: string,
    userId: string,
    rating?: number,
    comment?: string,
  ) {
    if (rating === undefined && comment === undefined) {
      throw new BadRequestException(
        'Either rating or comment must be provided',
      );
    }

    const existingRating = await this.ratingModel.findOne({
      _id: ratingId,
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!existingRating) {
      throw new BadRequestException(
        'Rating not found or you do not have permission to update it',
      );
    }

    const hadRatingBefore =
      existingRating.rating !== undefined && existingRating.rating !== null;

    const updateData: any = {};
    if (rating !== undefined) updateData.rating = rating;
    if (comment !== undefined) updateData.comment = comment;

    const updatedRating = await this.ratingModel.findByIdAndUpdate(
      ratingId,
      updateData,
      { new: true },
    );

    const hasRatingNow =
      updatedRating?.rating !== undefined && updatedRating?.rating !== null;
    if (hadRatingBefore || hasRatingNow) {
      await this.updateArtisanAverageRating(
        existingRating.artisanId.toString(),
      );
    }

    return updatedRating;
  }

  async deleteRating(ratingId: string, userId: string) {
    const rating = await this.ratingModel.findOne({
      _id: ratingId,
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!rating) {
      throw new BadRequestException(
        'Rating not found or you do not have permission to delete it',
      );
    }

    await this.userModel.findByIdAndUpdate(rating.userId, {
      $pull: { ratingHistory: rating._id },
    });

    await this.artisanModel.findByIdAndUpdate(rating.artisanId, {
      $pull: { ratingHistory: rating._id },
    });

    await this.ratingModel.findByIdAndDelete(ratingId);

    if (rating.rating) {
      await this.updateArtisanAverageRating(rating.artisanId.toString());
    }

    return { message: 'Rating deleted successfully' };
  }

  async updateArtisanAverageRating(artisanId: string) {
    const ratings = await this.ratingModel.aggregate([
      {
        $match: {
          artisanId: new mongoose.Types.ObjectId(artisanId),
          rating: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 },
        },
      },
    ]);

    if (ratings.length > 0) {
      await this.artisanModel.findByIdAndUpdate(artisanId, {
        averageRateness: Math.round(ratings[0].avgRating * 10) / 10,
        totalRatings: ratings[0].count,
      });
    } else {
      await this.artisanModel.findByIdAndUpdate(artisanId, {
        averageRateness: 0,
        totalRatings: 0,
      });
    }
  }

  async getUserRatingHistory(userId: string) {
    const user = await this.userModel.findById(userId).populate({
      path: 'ratingHistory',
      populate: { path: 'artisanId', select: 'name specialty avatarUrl' },
    });

    return user?.ratingHistory || [];
  }

  async getArtisanRatingHistory(artisanId: string) {
    const artisan = await this.artisanModel.findById(artisanId).populate({
      path: 'ratingHistory',
      populate: { path: 'userId', select: 'email' },
    });

    return artisan?.ratingHistory || [];
  }
}
