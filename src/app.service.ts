import { Injectable, NotFoundException } from '@nestjs/common';

import { UserService } from './modules/user/user.service';
import { User } from './modules/user/user.entity';
import { CreateUserDto } from './shared/dto/create-user.dto';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  async getProfile(
    userId: string,
  ): Promise<Omit<User, 'createdAt' | 'password'>> {
    const user = await this.userService.findByKey('id', userId);
    if (!user) throw new NotFoundException('User not found');
    const { createdAt, password, ...restKey } = user;

    return { ...restKey };
  }

  async updateProfile(
    userDto: CreateUserDto,
    id: string,
  ): Promise<Omit<User, 'createdAt' | 'password'>> {
    const updateResult = await this.userService.update(userDto, id);

    if (!updateResult.affected) throw new NotFoundException('User not found');
    const user = await this.userService.findByKey('email', userDto.email);

    const { createdAt, password, ...restKey } = user as User;
    return { ...restKey };
  }
}
