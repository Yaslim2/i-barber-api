import { RefreshToken } from '@application/entities/auth/refresh-token';
import { User } from '@application/entities/user/user';
import { AuthRepository } from '@application/repositories/auth-repository';
import { UserRepository } from '@application/repositories/user-repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: RefreshToken;
}

@Injectable()
export class Login {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(request: LoginRequest): Promise<LoginResponse> {
    const user = await this.validateUser(request);
    const refreshToken = await this.authRepository.findRefreshToken(user.id);
    if (refreshToken) {
      await this.authRepository.deleteRefreshToken(user.id);
    }
    const tokenResponse = this.generateToken(user);
    const newRefreshToken = new RefreshToken({
      expiresAt: this.handleGenerateExpiresAt(),
      token: tokenResponse.refresh_token,
      userId: user.id,
    });
    await this.authRepository.saveRefreshToken(newRefreshToken);
    return {
      user,
      accessToken: tokenResponse.access_token,
      refreshToken: newRefreshToken,
    };
  }

  private handleGenerateExpiresAt() {
    const today = new Date();
    return new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  }

  private generateToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      }),
    };
  }

  private async validateUser(request: LoginRequest) {
    const user = await this.userRepository.findByEmail(request.email);
    if (bcrypt.compareSync(request.password, user.password.value)) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
