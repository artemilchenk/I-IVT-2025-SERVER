import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {
  AuthenticatedUser,
  JwtPayload,
  SignUpResponseData,
} from '../../types/auth';
import { CreateUserDto } from '../../shared/dto/create-user.dto';

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
    const payload: JwtPayload = { id: user.id };

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
    const { password, createdAt, ...result } = user;
    return await this.signIn(result);
  }

  async signIn(user: AuthenticatedUser): Promise<SignUpResponseData> {
    const token = await this.generateToken(user);
    return { ...token, user };
  }
}
