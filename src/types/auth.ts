import { User } from '../modules/user/user.entity';

export type AuthenticatedUser = Omit<User, 'password' | 'createdAt'>;
export interface AuthResponseData {
  access_token: string;
}
export interface SignUpResponseData extends AuthResponseData {
  user: AuthenticatedUser;
}
export interface SignInResponseData extends AuthResponseData {}

export interface JwtPayload {
  id: number;
}

export interface JwtUser extends JwtPayload {}

export type SignUpResponseSchema = { example: SignUpResponseData };
export type SignInResponseSchema = { example: SignInResponseData };
export type SignInApiBodySchema = {
  example: {
    email: string;
    password: string;
  };
};

export type SignUpApiBodySchema = {
  example: {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
  };
};

export type UpdateProfileBodySchema = {
  example: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
  };
};
