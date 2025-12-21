import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

@Schema({ timestamps: true })
export class Rating extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artisan',
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
export const RatingSchema = SchemaFactory.createForClass(Rating);
