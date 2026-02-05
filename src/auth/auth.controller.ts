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
import { ArtisanVerifyEmailDto } from './dto/artisan-verify-email.dto';
import { ArtisanResendOTPCodeDto } from './dto/artisan-resend-otp-code.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register a new artisan',
    description:
      'Creates a new artisan account and sends an OTP verification code to the provided email address. The OTP code is valid for 3 minutes.',
  })
  @ApiResponse({
    status: 201,
    description: 'Artisan successfully registered. OTP sent to email.',
    schema: {
      example: 'Check Email For Continue Verification Process',
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request - Validation failed or resource conflict',
    examples: {
      artisanExists: {
        summary: 'Artisan already exists',
        value: {
          statusCode: 400,
          message: 'artisan already exist',
          error: 'Bad Request',
        },
      },
      artisanNumberIsTaken: {
        summary: 'Phone number already in use',
        value: {
          statusCode: 400,
          message: 'mobile number is already in use',
          error: 'Bad Request',
        },
      },
    },
  })
  @Post('artisan/sign-up')
  artisanSignUp(@Body() aritsanSignUpDto: ArtisanSignUpDto) {
    return this.authService.artisanSignUp(aritsanSignUpDto);
  }

  @ApiOperation({
    summary: 'Verify artisan email with OTP',
    description:
      'Verifies the artisan email address using the OTP code sent during registration. The OTP is valid for 3 minutes.',
  })
  @ApiResponse({
    status: 201,
    description: 'Email successfully verified',
    schema: {
      example: {
        message: 'artisan verified successfully',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Artisan not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'artisan Not Found',
        error: 'Not Found',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request - Invalid or expired OTP',
    examples: {
      alreadyVerified: {
        summary: 'Artisan already verified',
        value: {
          statusCode: 400,
          message: 'artisan Is Already Verified',
          error: 'Bad Request',
        },
      },
      expiredOTP: {
        summary: 'OTP code expired',
        value: {
          statusCode: 400,
          message: 'OTP Code Has Expired',
          error: 'Bad Request',
        },
      },
      invalidOTP: {
        summary: 'Invalid OTP code',
        value: {
          statusCode: 400,
          message: 'Invalid OTP Code Provided',
          error: 'Bad Request',
        },
      },
    },
  })
  @Post('artisan/verify-email')
  artisanVerifyEmail(@Body() artisanVerifyEmailDto: ArtisanVerifyEmailDto) {
    return this.authService.artisanVerifyEmail(artisanVerifyEmailDto);
  }

  @ApiOperation({
    summary: 'Resend OTP verification code',
    description:
      'Generates and sends a new OTP verification code to the artisan email address. The new OTP is valid for 3 minutes.',
  })
  @ApiResponse({
    status: 201,
    description: 'New OTP code sent successfully',
    schema: {
      example: {
        message: 'OTPCode Has been sent to your email',
      },
    },
  })
  @Post('artisan/resend-verification-code')
  artisanResendOTPCode(
    @Body() artisanResendOTPCodeDto: ArtisanResendOTPCodeDto,
  ) {
    return this.authService.artisanResendOTPCode(artisanResendOTPCodeDto);
  }

  @ApiOperation({
    summary: 'Artisan sign in',
    description:
      'Authenticates an artisan and returns a JWT token valid for 1 hour. The artisan must have verified their email before signing in.',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully signed in',
    schema: {
      example: {
        message: 'signIn passed successfully',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTFiMmMzZDRlNWY2ZzciLCJpYXQiOjE3MDUwNjg3MjMsImV4cCI6MTcwNTA3MjMyM30.xYzABcDeFgHiJkLmNoPqRsTuVwXyZ',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Artisan not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'artisan does not exist',
        error: 'Not Found',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request - Invalid credentials or unverified email',
    examples: {
      invalidCredentials: {
        summary: 'Invalid credentials',
        value: {
          statusCode: 400,
          message: 'invalid credentials',
          error: 'Bad Request',
        },
      },
      unverifiedEmail: {
        summary: 'Email not verified',
        value: {
          statusCode: 400,
          message: 'Verify Email First',
          error: 'Bad Request',
        },
      },
    },
  })
  @Post('artisan/sign-in')
  artisanSignIn(@Body() artisanSignInDto: ArtisanSignInDto) {
    return this.authService.artisanSignIn(artisanSignInDto);
  }

  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user account with email and password.',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    schema: {
      example: {
        message: 'user created successfully',
        data: {
          _id: '65a1b2c3d4e5f6g7h8i9j0k1',
          email: 'user@example.com',
          createdAt: '2024-01-12T10:30:00.000Z',
          updatedAt: '2024-01-12T10:30:00.000Z',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'User already exists',
    schema: {
      example: {
        statusCode: 400,
        message: 'user already exists',
        error: 'Bad Request',
      },
    },
  })
  @Post('user/sign-up')
  userSignUp(@Body() userSignUpDto: UserSignUpDto) {
    return this.authService.userSignUp(userSignUpDto);
  }

  @ApiOperation({
    summary: 'User sign in',
    description:
      'Authenticates a user and returns a JWT token valid for 1 hour.',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully signed in',
    schema: {
      example: {
        message: 'sign in passed successfully',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTFiMmMzZDRlNWY2ZzciLCJpYXQiOjE3MDUwNjg3MjMsImV4cCI6MTcwNTA3MjMyM30.xYzABcDeFgHiJkLmNoPqRsTuVwXyZ',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'user does not exists',
        error: 'Not Found',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid credentials',
    schema: {
      example: {
        statusCode: 400,
        message: 'invalid credentials',
        error: 'Bad Request',
      },
    },
  })
  @Post('user/sign-in')
  userSignIn(@Body() userSignInDto: UserSignInDto) {
    return this.authService.userSignIn(userSignInDto);
  }

  @ApiOperation({
    summary: 'Get current artisan profile',
    description:
      'Retrieves the profile information of the currently authenticated artisan.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Returns the current artisan profile',
    schema: {
      example: {
        _id: '65a1b2c3d4e5f6g7h8i9j0k1',
        email: 'artisan@example.com',
        name: 'John Doe',
        phoneNumber: '+1234567890',
        specialty: 'Carpenter',
        description: 'Experienced carpenter with 10 years of expertise',
        linkOfSocialMedia: 'https://instagram.com/johndoe',
        avatarUrl: 'https://example.com/avatar.jpg',
        experience: 10,
        city: 'New York',
        verified: true,
        createdAt: '2024-01-12T10:30:00.000Z',
        updatedAt: '2024-01-12T10:30:00.000Z',
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
  @Get('artisan/current-artisan')
  @UseGuards(IsArtisanAuthGuard)
  getCurrentArtisan(@ArtisanId() artisanId) {
    return this.authService.getCurrentArtisan(artisanId);
  }

  @ApiOperation({
    summary: 'Get current user profile',
    description:
      'Retrieves the profile information of the currently authenticated user.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Returns the current user profile',
    schema: {
      example: {
        _id: '65a1b2c3d4e5f6g7h8i9j0k1',
        email: 'user@example.com',
        createdAt: '2024-01-12T10:30:00.000Z',
        updatedAt: '2024-01-12T10:30:00.000Z',
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
  @Get('user/current-user')
  @UseGuards(IsUserAuthGuard)
  getCurrentUser(@UserId() userId) {
    return this.authService.getCurrentUser(userId);
  }
}
