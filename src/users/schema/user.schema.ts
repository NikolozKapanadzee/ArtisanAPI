import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}
export const UserSchema = SchemaFactory.createForClass(User);
