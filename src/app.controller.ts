import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtUser } from './types/auth';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { getUpdateProfileSchema } from './schema/app';
import { unAuthorisedErrSchema } from './schema';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { User } from './modules/user/user.entity';
import type { TUpdateUser } from './types/user';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user profile by token' })
  @ApiResponse({
    status: 200,
    description: 'Returns user profile',
    schema: getUpdateProfileSchema,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: unAuthorisedErrSchema,
  })
  async getProfile(
    @Request() req: Request & { user: JwtUser },
  ): Promise<Omit<User, 'createdAt' | 'password'>> {
    return await this.appService.getProfile(req.user.id + '');
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user profile' })
  @ApiBody({ schema: getUpdateProfileSchema })
  @ApiResponse({
    status: 200,
    description: 'Updated user',
    schema: getUpdateProfileSchema,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: unAuthorisedErrSchema,
  })
  async updateProfile(
    @Request() req: Request & { user: JwtUser },
    @Body() user: TUpdateUser,
  ): Promise<Omit<User, 'createdAt' | 'password'>> {
    return await this.appService.updateProfile(user, req.user.id + '');
  }
}
