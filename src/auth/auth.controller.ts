import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ArtisanSignUpDto } from './dto/artisanSignUp.dto';
import { ArtisanSignInDto } from './dto/artisanSignIn.dto';
import { ArtisanId } from 'src/decorator/artisan.decorator';
import { UserSignUpDto } from './dto/userSignUp.dto';
import { UserSignInDto } from './dto/userSignIn.dto';
import { IsArtisanAuthGuard } from 'src/guard/IsArtisanAuthGuard.guard';
import { UserId } from 'src/decorator/user.decorator';
import { IsUserAuthGuard } from 'src/guard/IsUserAuthGuard.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('artisan/sign-up')
  artisanSignUp(@Body() aritsanSignUpDto: ArtisanSignUpDto) {
    return this.authService.artisanSignUp(aritsanSignUpDto);
  }
  @Post('artisan/sign-in')
  artisanSignIn(@Body() artisanSignInDto: ArtisanSignInDto) {
    return this.authService.artisanSignIn(artisanSignInDto);
  }

  @Post('user/sign-up')
  userSignUp(@Body() userSignUpDto: UserSignUpDto) {
    return this.authService.userSignUp(userSignUpDto);
  }
  @Post('user/sign-in')
  userSignIn(@Body() userSignInDto: UserSignInDto) {
    return this.authService.userSignIn(userSignInDto);
  }

  @Get('artisan/current-artisan')
  @UseGuards(IsArtisanAuthGuard)
  getCurrentArtisan(@ArtisanId() artisanId) {
    return this.authService.getCurrentArtisan(artisanId);
  }

  @Get('user/current-user')
  @UseGuards(IsUserAuthGuard)
  getCurrentUser(@UserId() userId) {
    return this.authService.getCurrentUser(userId);
  }
}
