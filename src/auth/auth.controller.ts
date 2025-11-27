import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../shared/dto/create-user.dto';
import {
  AuthenticatedUser,
  SignInResponseData,
  SignUpResponseData,
} from '../types/auth';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() user: CreateUserDto): Promise<SignUpResponseData> {
    return await this.authService.signUp(user);
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Request() req: Request & { user: AuthenticatedUser },
  ): Promise<SignInResponseData> {
    return this.authService.signIn(req.user);
  }
}
