import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../shared/dto/create-user.dto';
import { UserKeys } from '../types/user';

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

  async findByKey(key: UserKeys, value: string): Promise<User | null> {
    return await this.userRepository.findByKey(key, value);
  }
}
