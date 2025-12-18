import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Artisan, ArtisanSchema } from 'src/artisan/schema/artisan.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: ArtisanSchema, name: Artisan.name }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
