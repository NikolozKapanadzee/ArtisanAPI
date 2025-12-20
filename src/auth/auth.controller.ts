import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ArtisanSignUpDto } from './dto/artisanSignUp.dto';
import { ArtisanSignInDto } from './dto/artisanSignIn.dto';
import { ArtisanId } from 'src/decorator/artisan.decorator';
import { IsAuthGuard } from 'src/guard/IsAuthGuard.guard';

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
  @Get('artisan/current-artisan')
  @UseGuards(IsAuthGuard)
  getCurrentArtisan(@ArtisanId() artisanId) {
    return this.authService.getCurrentArtisan(artisanId);
  }
}
