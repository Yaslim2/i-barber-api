import { User } from '@application/entities/user/user';
import { UserRepository } from '@application/repositories/user-repository';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { NotFound } from '../errors/user-not-found';
interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class Login {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(request: LoginRequest): Promise<LoginResponse> {
    const user = await this.validateUser(request);
    const { accessToken, refreshToken } = await this.generateToken(user);
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async validateUser(request: LoginRequest) {
    const user = await this.userRepository.findByEmail(request.email);
    if (user) {
      if (bcrypt.compareSync(request.password, user.hashPassword.value)) {
        return user;
      } else {
        throw new UnprocessableEntityException('Username or password invalid');
      }
    } else {
      throw new NotFound('user');
    }
  }
}
