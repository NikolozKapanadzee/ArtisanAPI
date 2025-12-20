import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Artisan } from 'src/artisan/schema/artisan.schema';
import { User } from 'src/users/schema/user.schema';

@Schema({ timestamps: true })
export class Rating {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'artisan',
    required: true,
  })
  artisanId: mongoose.Types.ObjectId;

  @Prop({
    type: Number,
    min: 1,
    max: 10,
    required: false,
  })
  rating?: number;

  @Prop({
    required: false,
    type: String,
  })
  comment?: string;
}

export const ratingSchema = SchemaFactory.createForClass(Rating);
