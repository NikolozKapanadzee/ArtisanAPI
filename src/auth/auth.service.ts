import { Artisan } from 'src/artisan/schema/artisan.schema';
import { SignUpDto } from './dto/signUp.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Artisan.name) private artisanModel: Model<Artisan>,
  ) {}
  async signUp(signUpDto: SignUpDto) {
    const {
      email,
      password,
      name,
      phoneNumber,
      specialty,
      description,
      linkOfSocialMedia,
      avatarUrl,
      experience,
    } = signUpDto;
    const existArtisan = await this.artisanModel.findOne({ email });
    if (existArtisan) {
      throw new BadRequestException('artisan already exist');
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newArtisan = await this.artisanModel.create({
      email,
      password: hashedPass,
      name,
      phoneNumber,
      specialty,
      description,
      linkOfSocialMedia,
      avatarUrl,
      experience,
    });
    const artisanWithoutPassword = await this.artisanModel
      .findById(newArtisan._id)
      .select('-password');
    return {
      message: 'artisan created successfully',
      data: artisanWithoutPassword,
    };
  }
}
