import { User } from '@application/entities/user/user';
import { UserRepository } from '@application/repositories/user-repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
interface LoginRequest {
  email: string;
  password: string;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class Auth {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async validateUser(request: LoginRequest): Promise<User> {
    const user = await this.userRepository.findByEmail(request.email);
    if (bcrypt.compareSync(request.password, user.hashPassword.value)) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  async login(user: User): Promise<TokenResponse> {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refresh(refreshToken: string): Promise<TokenResponse> {
    const decoded = this.jwtService.decode(refreshToken) as {
      username: string;
    };
    const user = await this.userRepository.findByEmail(decoded.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
