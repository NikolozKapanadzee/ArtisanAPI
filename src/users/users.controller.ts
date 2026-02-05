import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all users',
    schema: {
      example: [
        {
          _id: '6984a21f023449c13adfebbf',
          email: 'user@gmail.com',
          ratingHistory: [],
          createdAt: '2026-02-05T13:58:55.753Z',
          updatedAt: '2026-02-05T13:58:55.753Z',
          __v: 0,
        },
      ],
    },
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'MongoDB ObjectId of the user',
    example: '6984a21f023449c13adfebbf',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found successfully',
    schema: {
      example: {
        message: 'user have found',
        data: {
          _id: '6984a21f023449c13adfebbf',
          email: 'user@gmail.com',
          ratingHistory: [],
          createdAt: '2026-02-05T13:58:55.753Z',
          updatedAt: '2026-02-05T13:58:55.753Z',
          __v: 0,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid ID format',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid ID format',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'user not found',
        error: 'Not Found',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'MongoDB ObjectId of the user',
    example: '6984a21f023449c13adfebbf',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    schema: {
      example: {
        message: 'user have been updated successfully',
        data: {
          _id: '6984a21f023449c13adfebbf',
          email: 'updated@gmail.com',
          ratingHistory: [],
          createdAt: '2026-02-05T13:58:55.753Z',
          updatedAt: '2026-02-05T14:30:00.000Z',
          __v: 0,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid ID format',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid ID format',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'user not found',
        error: 'Not Found',
      },
    },
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'MongoDB ObjectId of the user',
    example: '6984a21f023449c13adfebbf',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully',
    schema: {
      example: {
        message: 'user have been deleted successfully',
        data: {
          _id: '6984a21f023449c13adfebbf',
          email: 'user@gmail.com',
          ratingHistory: [],
          createdAt: '2026-02-05T13:58:55.753Z',
          updatedAt: '2026-02-05T13:58:55.753Z',
          __v: 0,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid ID format',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid ID format',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'user not found',
        error: 'Not Found',
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
