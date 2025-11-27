import { AuthenticatedUser, JwtUser } from './auth';

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser | JwtUser;
    }
  }
}
