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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Artisan')
@Controller('artisan')
export class ArtisanController {
  constructor(private readonly artisanService: ArtisanService) {}

  @ApiOperation({
    summary: 'Delete artisan avatar file',
    description:
      'Deletes the avatar file from AWS S3 and removes the avatar URL from the artisan profile. Requires authentication.',
  })
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fileId: {
          type: 'string',
          example: 'avatars/a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg',
          description: 'The file ID/path in AWS S3',
        },
      },
      required: ['fileId'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'File deleted successfully',
    schema: {
      example: {
        message: 'File deleted successfully',
        fileId: 'avatars/a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing token',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @Delete('file')
  @UseGuards(IsArtisanAuthGuard)
  deleteFile(@Body('fileId') fileId: string, @ArtisanId() artisanId) {
    return this.artisanService.deleteFileById(fileId, artisanId);
  }

  @ApiOperation({
    summary: 'Get file by ID',
    description:
      'Retrieves a file (typically an avatar) from AWS S3 using its file ID.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fileId: {
          type: 'string',
          example: 'avatars/a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg',
          description: 'The file ID/path in AWS S3',
        },
      },
      required: ['fileId'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'File retrieved successfully',
    schema: {
      example: {
        url: 'https://s3.amazonaws.com/bucket-name/avatars/a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg',
        fileId: 'avatars/a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg',
      },
    },
  })
  @Post('get-file')
  getFile(@Body('fileId') fileId: string) {
    return this.artisanService.getFileById(fileId);
  }

  @ApiOperation({
    summary: 'Upload artisan avatar',
    description:
      'Uploads a new avatar image for the authenticated artisan to AWS S3 and updates the artisan profile with the new avatar URL.',
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Avatar image file (JPEG, PNG, etc.)',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Avatar uploaded successfully',
    schema: {
      example: 'avatars/a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg',
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing token',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @Post('upload-avatar')
  @UseGuards(IsArtisanAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @ArtisanId() artisanId,
  ) {
    return this.artisanService.uploadFile(file, artisanId);
  }

  @ApiOperation({
    summary: 'Get all artisans with filters',
    description:
      'Retrieves a list of all artisans. Can be filtered by specialty and/or city using query parameters.',
  })
  @ApiQuery({
    name: 'specialty',
    required: false,
    type: [String],
    description: 'Filter by one or more specialties (e.g., Carpenter, Plumber)',
    example: ['Carpenter', 'Electrician'],
  })
  @ApiQuery({
    name: 'city',
    required: false,
    type: [String],
    description: 'Filter by one or more cities',
    example: ['New York', 'Los Angeles'],
  })
  @ApiResponse({
    status: 200,
    description: 'List of artisans retrieved successfully',
    schema: {
      example: [
        {
          _id: '65a1b2c3d4e5f6g7h8i9j0k1',
          email: 'artisan1@example.com',
          name: 'John Doe',
          phoneNumber: '+1234567890',
          specialty: 'Carpenter',
          description: 'Experienced carpenter',
          linkOfSocialMedia: 'https://instagram.com/johndoe',
          avatarUrl: 'avatars/a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg',
          experience: 10,
          city: 'New York',
          verified: true,
          createdAt: '2024-01-12T10:30:00.000Z',
          updatedAt: '2024-01-12T10:30:00.000Z',
        },
        {
          _id: '65a1b2c3d4e5f6g7h8i9j0k2',
          email: 'artisan2@example.com',
          name: 'Jane Smith',
          phoneNumber: '+0987654321',
          specialty: 'Electrician',
          description: 'Licensed electrician',
          linkOfSocialMedia: 'https://instagram.com/janesmith',
          avatarUrl: 'avatars/b2c3d4e5-f6g7-8901-bcde-fg2345678901.jpg',
          experience: 8,
          city: 'Los Angeles',
          verified: true,
          createdAt: '2024-01-12T11:00:00.000Z',
          updatedAt: '2024-01-12T11:00:00.000Z',
        },
      ],
    },
  })
  @Get()
  findAll(@Query() filterArtisanDto: FilterArtisanDto) {
    return this.artisanService.findAll(filterArtisanDto);
  }

  @ApiOperation({
    summary: 'Get artisan by ID',
    description: 'Retrieves detailed information about a specific artisan.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artisan MongoDB ObjectId',
    example: '65a1b2c3d4e5f6g7h8i9j0k1',
  })
  @ApiResponse({
    status: 200,
    description: 'Artisan found successfully',
    schema: {
      example: {
        _id: '65a1b2c3d4e5f6g7h8i9j0k1',
        email: 'artisan@example.com',
        name: 'John Doe',
        phoneNumber: '+1234567890',
        specialty: 'Carpenter',
        description: 'Experienced carpenter with 10 years of expertise',
        linkOfSocialMedia: 'https://instagram.com/johndoe',
        avatarUrl: 'avatars/a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg',
        experience: 10,
        city: 'New York',
        verified: true,
        createdAt: '2024-01-12T10:30:00.000Z',
        updatedAt: '2024-01-12T10:30:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid ID format',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid ID format',
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Artisan not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Artisan not found',
        error: 'Not Found',
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artisanService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update artisan by ID',
    description:
      'Updates an artisan profile with new information. All fields are optional.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artisan MongoDB ObjectId',
    example: '65a1b2c3d4e5f6g7h8i9j0k1',
  })
  @ApiResponse({
    status: 200,
    description: 'Artisan updated successfully',
    schema: {
      example: {
        message: 'Artisan updated successfully',
        data: {
          _id: '65a1b2c3d4e5f6g7h8i9j0k1',
          email: 'artisan@example.com',
          name: 'John Doe Updated',
          phoneNumber: '+1234567890',
          specialty: 'Carpenter',
          description: 'Updated description',
          linkOfSocialMedia: 'https://instagram.com/johndoe',
          avatarUrl: 'avatars/a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg',
          experience: 12,
          city: 'New York',
          verified: true,
          createdAt: '2024-01-12T10:30:00.000Z',
          updatedAt: '2024-01-13T14:20:00.000Z',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid ID format or validation error',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid ID format',
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Artisan not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Artisan not found',
        error: 'Not Found',
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtisanDto: UpdateArtisanDto) {
    return this.artisanService.update(id, updateArtisanDto);
  }

  @ApiOperation({
    summary: 'Delete artisan by ID',
    description:
      'Permanently deletes an artisan profile from the database. This action cannot be undone.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artisan MongoDB ObjectId',
    example: '65a1b2c3d4e5f6g7h8i9j0k1',
  })
  @ApiResponse({
    status: 200,
    description: 'Artisan deleted successfully',
    schema: {
      example: {
        message: 'Artisan deleted successfully',
        data: {
          _id: '65a1b2c3d4e5f6g7h8i9j0k1',
          email: 'artisan@example.com',
          name: 'John Doe',
          phoneNumber: '+1234567890',
          specialty: 'Carpenter',
          description: 'Experienced carpenter',
          linkOfSocialMedia: 'https://instagram.com/johndoe',
          avatarUrl: 'avatars/a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg',
          experience: 10,
          city: 'New York',
          verified: true,
          createdAt: '2024-01-12T10:30:00.000Z',
          updatedAt: '2024-01-12T10:30:00.000Z',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid ID format',
    schema: {
      example: {
        statusCode: 400,
        message: 'ID format',
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Artisan not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Artisan not found',
        error: 'Not Found',
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artisanService.remove(id);
  }
}
