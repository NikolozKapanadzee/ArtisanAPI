import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Rating } from 'src/rating/schema/rating.schema';

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;
  @Prop({
    type: String,
    required: true,
    minLength: 6,
    maxLength: 20,
  })
  password: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'rating' }],
    default: [],
  })
  ratingHistory: mongoose.Types.ObjectId[];
}
export const UserSchema = SchemaFactory.createForClass(User);
