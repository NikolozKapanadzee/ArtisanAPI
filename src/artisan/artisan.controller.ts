import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtisanService } from './artisan.service';
import { CreateArtisanDto } from './dto/create-artisan.dto';
import { UpdateArtisanDto } from './dto/update-artisan.dto';

@Controller('artisan')
export class ArtisanController {
  constructor(private readonly artisanService: ArtisanService) {}

  @Post()
  create(@Body() createArtisanDto: CreateArtisanDto) {
    return this.artisanService.create(createArtisanDto);
  }

  @Get()
  findAll() {
    return this.artisanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artisanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtisanDto: UpdateArtisanDto) {
    return this.artisanService.update(+id, updateArtisanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artisanService.remove(+id);
  }
}
