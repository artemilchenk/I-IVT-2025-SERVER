import { Injectable, NotFoundException } from '@nestjs/common';

import { UpdateUserDto } from './shared/dto/update-user.dto';
import { UserService } from './modules/user/user.service';
import { User } from './modules/user/user.entity';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getProfile(id: string): Promise<User> {
    const user = await this.userService.findByKey('id', id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async updateProfile(user: UpdateUserDto, id: string): Promise<User> {
    const updateResult = await this.userService.update(user, id);

    if (!updateResult.affected) throw new NotFoundException('User not found');

    return (await this.userService.findByKey('email', user.email)) as User;
  }
}
