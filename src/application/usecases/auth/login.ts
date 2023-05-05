import { RefreshToken } from '@application/entities/auth/refresh-token';
import {
  AuthRepository,
  TokenResponse,
} from '@application/repositories/auth-repository';
import { UserRepository } from '@application/repositories/user-repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
interface LoginRequest {
  email: string;
  password: string;
}
import { User } from '@prisma/client';
@Injectable()
export class Login {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(request: LoginRequest): Promise<TokenResponse> {
    const user = await this.validateUser(request);
    const refreshToken = await this.authRepository.findRefreshToken(user.id);
    if (refreshToken) {
      await this.authRepository.deleteRefreshToken(user.id);
    }
    const tokenResponse = this.generateToken(user);
    await this.authRepository.saveRefreshToken(
      new RefreshToken({
        expiresAt: this.handleGenerateExpiresAt(),
        token: tokenResponse.refresh_token,
        userId: user.id,
      }),
    );
    return tokenResponse;
  }

  private handleGenerateExpiresAt() {
    const today = new Date();
    return new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  }

  private generateToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  private async validateUser(request: LoginRequest) {
    const user = await this.userRepository.findByEmail(request.email);
    if (bcrypt.compareSync(request.password, user.password)) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
