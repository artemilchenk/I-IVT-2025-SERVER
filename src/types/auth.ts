import { User } from '../user/user.entity';

export type AuthenticatedUser = Omit<User, 'password'>;
export interface AuthResponseData {
  access_token: string;
}
export interface SignUpResponseData extends AuthResponseData {
  user: AuthenticatedUser;
}
export interface SignInResponseData extends AuthResponseData {}

export interface JwtPayload {
  id: number;
  email: string;
}

export interface JwtUser extends JwtPayload {}
