import { Injectable, NotFoundException } from '@nestjs/common';

import { UserService } from './modules/user/user.service';
import { User } from './modules/user/user.entity';
import { CreateUserDto } from './shared/dto/create-user.dto';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  async getProfile(id: string): Promise<User> {
    const user = await this.userService.findByKey('id', id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async updateProfile(user: CreateUserDto, id: string): Promise<User> {
    const updateResult = await this.userService.update(user, id);

    if (!updateResult.affected) throw new NotFoundException('User not found');

    return (await this.userService.findByKey('email', user.email)) as User;
  }
}
