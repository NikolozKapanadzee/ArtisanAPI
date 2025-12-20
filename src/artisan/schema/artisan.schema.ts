import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ArtisanSpecialty } from 'src/enum/specialty.enum';

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
  })
  averageRateness?: number;

  @Prop({ required: true, type: Number, min: 0 })
  experience: number;
}

export const ArtisanSchema = SchemaFactory.createForClass(Artisan);
