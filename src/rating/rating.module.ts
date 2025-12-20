import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Rating, ratingSchema } from './schema/rating.schema';
import { Artisan, ArtisanSchema } from 'src/artisan/schema/artisan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: UserSchema, name: User.name },
      { schema: ratingSchema, name: Rating.name },
      { schema: ArtisanSchema, name: Artisan.name },
    ]),
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
