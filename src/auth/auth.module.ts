import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Artisan, ArtisanSchema } from 'src/artisan/schema/artisan.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: ArtisanSchema, name: Artisan.name },
      { schema: UserSchema, name: User.name },
    ]),
    ConfigModule.forRoot(),
    JwtModule.register({ global: true, secret: process.env.JWT_SECRET }),
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
