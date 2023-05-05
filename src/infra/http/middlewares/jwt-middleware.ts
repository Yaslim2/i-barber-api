import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@application/repositories/user-repository';
import { AuthRepository } from '@application/repositories/auth-repository';
import { RefreshToken } from '@application/entities/auth/refresh-token';

export interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies['access_token'];

    if (!accessToken) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }

    try {
      const payload: JwtPayload = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });

      const user = await this.userRepository.findById(payload.sub);

      req.user = user;

      return next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        const refreshToken = req.cookies['refresh_token'];

        if (!refreshToken) {
          return res.status(401).json({ message: 'Missing or invalid token' });
        }

        try {
          const payload: JwtPayload = await this.jwtService.verify(
            refreshToken,
            {
              secret: process.env.JWT_REFRESH_TOKEN_SECRET,
            },
          );

          const refreshTokenData = await this.authRepository.findRefreshToken(
            payload.sub,
          );

          if (!refreshTokenData) {
            return res
              .status(401)
              .json({ message: 'Missing or invalid token' });
          }

          const user = await this.userRepository.findById(payload.sub);

          if (!user) {
            return res.status(401).json({ message: 'User not found' });
          }

          const newAccessToken = this.jwtService.sign(payload, {
            expiresIn: '60s',
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          });

          const newRefreshToken = this.jwtService.sign(payload, {
            expiresIn: '7d',
            secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          });

          await this.authRepository.deleteRefreshToken(user.id);

          await this.authRepository.saveRefreshToken(
            new RefreshToken({
              expiresAt: new Date(
                new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
              ),
              token: newRefreshToken,
              userId: user.id,
            }),
          );

          res.cookie('access_token', newAccessToken, { httpOnly: true });
          res.cookie('refresh_token', newRefreshToken, { httpOnly: true });

          req.user = user;
          return next();
        } catch (error) {
          return res.status(401).json({ message: 'Missing or invalid token' });
        }
      }
    }
  }
}
