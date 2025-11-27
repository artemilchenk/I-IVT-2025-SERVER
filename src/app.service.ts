import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  getHello(): string {
    return 'Hello World!';
  }
  async getProfile(email: string): Promise<User> {
    const user = await this.userService.findByKey('email', email);
    if (!user) throw new NotFoundException('Email does not exist');

    return user;
  }
}
