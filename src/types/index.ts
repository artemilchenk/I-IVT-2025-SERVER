import { User } from '../modules/user/user.entity';

export interface HashArgs {
  password: string;
  salt: number | string;
}

export interface GetUpdateProfileSchema {
  example: Pick<User, 'firstname' | 'lastname' | 'email'>;
}
