import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserService } from './modules/user/user.service';
import { User } from './modules/user/user.entity';
import type { TUpdateUser } from './types/user';
import * as bcrypt from 'bcryptjs';
import { isUserUpdateWiaPassword } from './shared/guards/user';

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
    userDto: TUpdateUser,
    id: string,
  ): Promise<Omit<User, 'createdAt' | 'password'>> {
    const user = await this.userService.findByKey('id', id);
    if (!user) throw new NotFoundException('User not found');

    let savedDto = { ...userDto };

    console.log({ savedDto });

    if (isUserUpdateWiaPassword(userDto)) {
      const isPasswordEqual = await bcrypt.compare(
        userDto.oldpassword,
        user.password,
      );
      if (isPasswordEqual) {
        const hashedNewPassword = await bcrypt.hash(
          userDto.password,
          this.userService.salt,
        );
        const { oldpassword, confirmpassword, ...result } = userDto;
        savedDto = { ...result, password: hashedNewPassword };
      } else throw new BadRequestException('Current password is incorrect');
    }

    const updateResult = await this.userService.update(savedDto, id);

    if (!updateResult.affected) throw new NotFoundException('User not found');
    const newUser = await this.userService.findByKey('id', id);

    if (!newUser) throw new NotFoundException('User updated but was not found');

    const { createdAt, password, ...restKey } = newUser as User;
    return { ...restKey };
  }
}
