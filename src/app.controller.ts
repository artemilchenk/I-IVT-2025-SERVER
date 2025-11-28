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
import { CreateUserDto } from './shared/dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './shared/dto/update-user.dto';
import { getUpdateProfileSchema } from './schema/app';
import { unAuthorisedErrSchema } from './schema';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { User } from './modules/user/user.entity';

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
  async getProfile(@Request() req: Request & { user: JwtUser }): Promise<User> {
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
    @Body() user: CreateUserDto,
  ): Promise<User> {
    return await this.appService.updateProfile(user, req.user.id + '');
  }
}
