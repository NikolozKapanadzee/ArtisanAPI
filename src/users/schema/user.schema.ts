import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  email: string;
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
