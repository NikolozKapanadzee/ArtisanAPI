import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

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
    select: false,
  })
  password: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
    default: [],
  })
  ratingHistory: mongoose.Types.ObjectId[];
}
export const UserSchema = SchemaFactory.createForClass(User);
