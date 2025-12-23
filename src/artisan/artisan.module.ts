import { Module } from '@nestjs/common';
import { ArtisanService } from './artisan.service';
import { ArtisanController } from './artisan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artisan, ArtisanSchema } from './schema/artisan.schema';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [
    AwsModule,
    MongooseModule.forFeature([{ schema: ArtisanSchema, name: Artisan.name }]),
  ],
  controllers: [ArtisanController],
  providers: [ArtisanService],
})
export class ArtisanModule {}
