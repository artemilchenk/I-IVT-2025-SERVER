import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from '../shared/dto/create-user.dto';
import { UserKeys } from '../types/user';

//We can add one more layer <repository> to create, retrieve data or encapsulate logic dealing with db.
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createOne(user: CreateUserDto): Promise<User> {
    const entity = this.create(user);
    return await this.save(entity);
  }

  async findByKey(key: UserKeys, value: string): Promise<User | null> {
    return await this.findOne({
      where: { [key]: value },
    });
  }
}
