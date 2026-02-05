import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return {
      message: 'user have found',
      data: user,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedUser) {
      throw new NotFoundException('user not found');
    }
    return {
      message: 'user have been updated successfully',
      data: updatedUser,
    };
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException('user not found');
    }
    return {
      message: 'user have been deleted successfully',
      data: deletedUser,
    };
  }
}
