import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  //We can add one more layer <repository> to create, retrieve data or encapsulate logic dealing with db.
  async createOne(user: CreateUserDto): Promise<User> {
    const entity = this.create(user);
    return await this.save(entity);
  }
}
