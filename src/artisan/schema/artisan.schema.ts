import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ArtisanCity } from 'src/enum/city.enum';
import { ArtisanSpecialty } from 'src/enum/specialty.enum';
import { Rating } from 'src/rating/schema/rating.schema';

@Schema({ timestamps: true })
export class Artisan {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  phoneNumber: number;

  @Prop({ required: true, enum: ArtisanSpecialty, type: [String] })
  specialty: ArtisanSpecialty[];

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  linkOfSocialMedia?: string;

  @Prop({ required: false })
  avatarUrl?: string;

  @Prop({
    type: Number,
    required: false,
    default: 0,
  })
  averageRateness?: number;

  @Prop({
    type: Number,
    required: false,
    default: 0,
  })
  totalRatings?: number;

  @Prop({ required: true, type: Number, min: 0 })
  experience: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Rating.name }],
    default: [],
  })
  ratingHistory: mongoose.Types.ObjectId[];

  @Prop({
    enum: ArtisanCity,
    required: true,
    type: String,
  })
  city: string;
}

export const ArtisanSchema = SchemaFactory.createForClass(Artisan);
