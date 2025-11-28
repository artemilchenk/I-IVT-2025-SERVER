import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LocalAuthGuard } from './local-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  signInApiBodySchema,
  signInResponseSchema,
  signUpApiBodySchema,
  signUpResponseSchema,
} from '../../schema/auth';
import { badRequestErrSchema, unAuthorisedErrSchema } from '../../schema';
import { CreateUserDto } from '../../shared/dto/create-user.dto';
import {
  AuthenticatedUser,
  SignInResponseData,
  SignUpResponseData,
} from '../../types/auth';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({
    summary: 'Create a new user account and return user and access token',
  })
  @ApiBody({ description: 'User sign-up payload', schema: signUpApiBodySchema })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    schema: signUpResponseSchema,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: badRequestErrSchema,
  })
  async signUp(@Body() user: CreateUserDto): Promise<SignUpResponseData> {
    return await this.authService.signUp(user);
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Authenticate user and return access token' })
  @ApiBody({
    description: 'User sign-in payload',
    schema: signInApiBodySchema,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated',
    schema: signInResponseSchema,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: unAuthorisedErrSchema,
  })
  async signIn(
    @Request() req: Request & { user: AuthenticatedUser },
  ): Promise<SignInResponseData> {
    return this.authService.signIn(req.user);
  }
}
