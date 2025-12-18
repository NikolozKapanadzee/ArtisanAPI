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
import { FilterArtisanDto } from './dto/filter-artisan.dto';

@Injectable()
export class ArtisanService {
  constructor(
    @InjectModel(Artisan.name) private ArtisanModel: Model<Artisan>,
  ) {}
  async findAll(filterArtisanDto: FilterArtisanDto) {
    const { specialty } = filterArtisanDto;
    const filter: any = {};
    if (specialty?.length) {
      filter.specialty = { $in: specialty };
    }
    return this.ArtisanModel.find(filter);
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
