import { AuthenticatedUser } from '../types/auth';
import { User } from '../modules/user/user.entity';

export const user: AuthenticatedUser = {
  id: 1,
  email: 'user@example.com',
  firstname: 'firstName@example.com',
  lastname: 'lastname@example.com',
};

export const updateUser: Pick<User, 'firstname' | 'lastname' | 'email'> = {
  email: 'user@example.com',
  firstname: 'firstName@example.com',
  lastname: 'lastname@example.com',
};
