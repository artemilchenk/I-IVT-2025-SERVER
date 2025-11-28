import { AuthenticatedUser } from './auth';

export interface HashArgs {
  password: string;
  salt: number | string;
}

export interface GetUpdateProfileSchema {
  example: AuthenticatedUser;
}
