import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../shared/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {
  AuthenticatedUser,
  JwtPayload,
  SignInResponseData,
  SignUpResponseData,
} from '../types/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser | null> {
    const user = await this.userService.findByKey('email', email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async generateToken(user: AuthenticatedUser) {
    const payload: JwtPayload = { id: user.id, email: user.email };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }

  async signUp(dto: CreateUserDto): Promise<SignUpResponseData> {
    //I separated responsibility in order to make user service to be creating or deleting
    //but when the user should be created and if - auth service decides.
    const existingUser = await this.userService.findByKey('email', dto.email);
    if (existingUser) throw new ConflictException('Email already exists');

    const user = await this.userService.create(dto);
    const { password, ...result } = user;
    const token = await this.signIn(result);
    return { ...token, user: result };
  }

  async signIn(user: AuthenticatedUser): Promise<SignInResponseData> {
    return await this.generateToken(user);
  }
}
