import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ArtisanService } from './artisan.service';
import { UpdateArtisanDto } from './dto/update-artisan.dto';
import { FilterArtisanDto } from './dto/filter-artisan.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('artisan')
export class ArtisanController {
  constructor(private readonly artisanService: ArtisanService) {}

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.artisanService.uploadFile(file);
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
