import {
  SignInApiBodySchema,
  SignUpApiBodySchema,
  SignUpResponseSchema,
} from '../types/auth';
import { user } from '../constants';

export const signUpResponseSchema: SignUpResponseSchema = {
  example: {
    access_token: 'access_token',
    user,
  },
};

export const signInApiBodySchema: SignInApiBodySchema = {
  example: {
    email: 'artem@example.com',
    password: 'StrongPassword123',
  },
};

export const signUpApiBodySchema: SignUpApiBodySchema = {
  example: {
    email: 'user@example.com',
    firstname: 'firstName@example.com',
    lastname: 'lastname@example.com',
    password: 'StrongPassword123',
  },
};
