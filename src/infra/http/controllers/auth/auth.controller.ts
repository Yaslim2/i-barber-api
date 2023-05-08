import { Body, Controller, HttpCode, Post, Response } from '@nestjs/common';
import { UserViewModel } from '@infra/http/view-models/user-view-model';
import { Login } from '@application/usecases/auth/login';
import { LoginUserBody } from '@infra/http/dtos/login-user-body';
import { Response as ResponseExpress } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly login: Login) {}

  @Post('/login')
  async loginUser(
    @Body() { email, password }: LoginUserBody,
    @Response() res: ResponseExpress,
  ) {
    const { user, accessToken, refreshToken } = await this.login.execute({
      email,
      password,
    });
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });
    return res.status(201).send({
      user: UserViewModel.toHTTP(user),
    });
  }

  @HttpCode(204)
  @Post('/logout')
  async logoutUser(@Response() res: ResponseExpress) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.status(204);
  }
}
