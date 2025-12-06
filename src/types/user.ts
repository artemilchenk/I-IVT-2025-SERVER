import { User } from '../modules/user/user.entity';

export type UserEntityKeys = keyof User;
export type UpdateUserBase = Pick<User, 'firstname' | 'lastname' | 'email'>;
export type UpdateUserWiaPassword = Pick<
  User,
  'firstname' | 'lastname' | 'email'
> & { oldpassword: string; password: string; confirmpassword: string };

export type TUpdateUser = UpdateUserBase | UpdateUserWiaPassword;
