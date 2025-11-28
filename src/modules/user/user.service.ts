import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

import { UpdateResult } from 'typeorm';
import { HashArgs } from '../../types';
import { CreateUserDto } from '../../shared/dto/create-user.dto';
import { UpdateUserDto } from '../../shared/dto/update-user.dto';
import { UserKeys } from '../../types/user';

@Injectable()
export class UserService {
  private readonly salt = 10;

  constructor(private readonly userRepository: UserRepository) {}

  async hashPassword(args: HashArgs) {
    return await bcrypt.hash(args.password, args.salt);
  }

  async create(user: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword({
      password: user.password,
      salt: this.salt,
    });

    return await this.userRepository.createOne({
      ...user,
      password: hashedPassword,
    });
  }

  async update(user: UpdateUserDto, id: string): Promise<UpdateResult> {
    const hashedPassword = await this.hashPassword({
      password: user.password,
      salt: this.salt,
    });

    return await this.userRepository.update(
      { id: Number(id) },
      {
        ...user,
        password: hashedPassword,
      },
    );
  }

  async findByKey(key: UserKeys, value: string): Promise<User | null> {
    return await this.userRepository.findByKey(key, value);
  }
}
