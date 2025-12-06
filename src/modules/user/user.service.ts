import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateResult } from 'typeorm';
import { HashArgs } from '../../types';
import { CreateUserDto } from '../../shared/dto/create-user.dto';
import { TUpdateUser, UserEntityKeys } from '../../types/user';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  readonly salt = 10;

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

  async update(user: TUpdateUser, id: string): Promise<UpdateResult> {
    return await this.userRepository.updateOne({ id: Number(id) }, user);
  }

  async findByKey(key: UserEntityKeys, value: string) {
    return await this.userRepository.findByKey(key, value);
  }
}
