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
  UseGuards,
} from '@nestjs/common';
import { ArtisanService } from './artisan.service';
import { FilterArtisanDto } from './dto/filter-artisan.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArtisanId } from 'src/decorator/artisan.decorator';
import { IsArtisanAuthGuard } from 'src/guard/IsArtisanAuthGuard.guard';
import { UpdateArtisanDto } from './dto/update-artisan.dto';

@Controller('artisan')
export class ArtisanController {
  constructor(private readonly artisanService: ArtisanService) {}

  @Delete('file')
  @UseGuards(IsArtisanAuthGuard)
  deleteFile(@Body('fileId') fileId: string, @ArtisanId() artisanId) {
    return this.artisanService.deleteFileById(fileId, artisanId);
  }

  @Post('get-file')
  getFile(@Body('fileId') fileId: string) {
    return this.artisanService.getFileById(fileId);
  }

  @Post('upload-avatar')
  @UseGuards(IsArtisanAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @ArtisanId() artisanId,
  ) {
    return this.artisanService.uploadFile(file, artisanId);
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
