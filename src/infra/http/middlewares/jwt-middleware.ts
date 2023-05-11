import { Injectable, NestMiddleware } from '@nestjs/common';
import { Unauthorized } from '@application/usecases/errors/unauthorized';
import { NotFound } from '@application/usecases/errors/user-not-found';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@application/repositories/user-repository';
import { setCookies } from '@helpers/set-cookies';
export interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies['access_token'];

    if (!accessToken) {
      res.clearCookie('access_token');
      throw new Unauthorized();
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
          res.clearCookie('refresh_token');
          throw new Unauthorized();
        }

        try {
          const payload: JwtPayload = await this.jwtService.verify(
            refreshToken,
            {
              secret: process.env.JWT_REFRESH_TOKEN_SECRET,
            },
          );

          const user = await this.userRepository.findById(payload.sub);

          if (!user) {
            throw new NotFound('User');
          }

          const newAccessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          });

          const newRefreshToken = this.jwtService.sign(payload, {
            expiresIn: '7d',
            secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          });
          setCookies({
            res,
            cookieKey: 'access_token',
            cookieValue: newAccessToken,
          });
          setCookies({
            res,
            cookieKey: 'refresh_token',
            cookieValue: newRefreshToken,
          });
          req.user = user;
          return next();
        } catch (error) {
          res.clearCookie('access_token');
          res.clearCookie('refresh_token');
          throw new Unauthorized();
        }
      }
    }
  }
}
