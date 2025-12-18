import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { ArtisanId } from 'src/decorator/artisan.decorator';
import { IsAuthGuard } from 'src/guard/IsAuthGuard.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
  @Get('current-artisan')
  @UseGuards(IsAuthGuard)
  getCurrentUser(@ArtisanId() artisanId) {
    return this.authService.getCurrentArtisan(artisanId);
  }
}
