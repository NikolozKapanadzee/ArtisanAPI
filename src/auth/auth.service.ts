import { Artisan } from 'src/artisan/schema/artisan.schema';
import { ArtisanSignUpDto } from './dto/artisanSignUp.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ArtisanSignInDto } from './dto/artisanSignIn.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/user.schema';
import { UserSignUpDto } from './dto/userSignUp.dto';
import { UserSignInDto } from './dto/userSignIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Artisan.name) private artisanModel: Model<Artisan>,
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async artisanSignUp(artisanSignUpDto: ArtisanSignUpDto) {
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
    } = artisanSignUpDto;
    const existArtisan = await this.artisanModel.findOne({ email });
    if (existArtisan) {
      throw new BadRequestException('artisan already exist');
    }
    const existNumber = await this.artisanModel.findOne({ phoneNumber });
    if (existNumber) {
      throw new BadRequestException('mobile number is already in use');
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

  async artisanSignIn(artisanSignInDto: ArtisanSignInDto) {
    const { email, password } = artisanSignInDto;
    const existArtisan = await this.artisanModel
      .findOne({ email })
      .select('password');
    if (!existArtisan) {
      throw new NotFoundException('artisan does not exist');
    }
    const isPassEqual = await bcrypt.compare(password, existArtisan.password);
    if (!isPassEqual) {
      throw new BadRequestException('invalid credentials');
    }
    const payload = { id: existArtisan._id };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    return {
      message: 'signIn passed successfully',
      token: token,
    };
  }

  async userSignUp(userSignUpDto: UserSignUpDto) {
    const { email, password } = userSignUpDto;
    const existUser = await this.userModel.findOne({ email });
    if (existUser) {
      throw new BadRequestException('user already exists');
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({
      email,
      password: hashedPass,
    });
    const newUserWithoutPassword = await this.userModel
      .findById(newUser._id)
      .select('-password');
    return {
      message: 'user created successfully',
      data: newUserWithoutPassword,
    };
  }

  async userSignIn(userSignInDto: UserSignInDto) {
    const { email, password } = userSignInDto;
    const existUser = await this.userModel
      .findOne({ email })
      .select('password');
    if (!existUser) {
      throw new NotFoundException('user does not exists');
    }
    const isPassEqual = await bcrypt.compare(password, existUser.password);
    if (!isPassEqual) {
      throw new BadRequestException('invalid credentials');
    }
    const payload = { id: existUser._id };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    return {
      message: 'sign in passed successfully',
      token: token,
    };
  }

  async getCurrentArtisan(artisanId) {
    const artisan = await this.artisanModel.findById(artisanId);
    return artisan;
  }

  async getCurrentUser(userId) {
    const user = await this.userModel.findById(userId);
    return user;
  }
}
