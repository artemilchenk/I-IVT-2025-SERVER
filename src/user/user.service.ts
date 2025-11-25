import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return await this.userRepository.createOne({
      ...user,
      password: hashedPassword,
    });
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
