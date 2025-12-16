import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtisanDto } from './dto/create-artisan.dto';
import { UpdateArtisanDto } from './dto/update-artisan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Artisan } from './schema/artisan.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class ArtisanService {
  constructor(
    @InjectModel(Artisan.name) private ArtisanModel: Model<Artisan>,
  ) {}
  async create(createArtisanDto: CreateArtisanDto) {
    const { mail } = createArtisanDto;
    const existArtisan = await this.ArtisanModel.findOne({ mail });
    if (existArtisan) {
      throw new BadRequestException('Artisan alraedy exists');
    }
    const newArtisan = await this.ArtisanModel.create(createArtisanDto);
    return {
      message: 'artisan created successfully',
      data: newArtisan,
    };
  }

  async findAll() {
    return await this.ArtisanModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const artisan = await this.ArtisanModel.findById(id);
    if (!artisan) {
      throw new NotFoundException('Artisan not found');
    }
    return artisan;
  }

  async update(id: string, updateArtisanDto: UpdateArtisanDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const updatedArtisan = await this.ArtisanModel.findByIdAndUpdate(
      id,
      updateArtisanDto,
      { new: true, runValidators: true },
    );
    if (!updatedArtisan) {
      throw new NotFoundException('Artisan not found');
    }
    return {
      message: 'Artisan updated successfully',
      data: updatedArtisan,
    };
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const deletedArtisan = await this.ArtisanModel.findByIdAndDelete(id);
    if (!deletedArtisan) {
      throw new NotFoundException('Artisan not found');
    }
    return {
      message: 'Artisan deleted successfully',
      data: deletedArtisan,
    };
  }
}
