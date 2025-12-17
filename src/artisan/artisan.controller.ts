import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ArtisanService } from './artisan.service';
import { CreateArtisanDto } from './dto/create-artisan.dto';
import { UpdateArtisanDto } from './dto/update-artisan.dto';
import { FilterArtisanDto } from './dto/filter-artisan.dto';

@Controller('artisan')
export class ArtisanController {
  constructor(private readonly artisanService: ArtisanService) {}

  @Post()
  create(@Body() createArtisanDto: CreateArtisanDto) {
    return this.artisanService.create(createArtisanDto);
  }

  @Get()
  findAll(@Query() filterArtisanDto: FilterArtisanDto) {
    return this.artisanService.findAll(filterArtisanDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artisanService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtisanDto: UpdateArtisanDto) {
    return this.artisanService.update(id, updateArtisanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artisanService.remove(id);
  }
}
