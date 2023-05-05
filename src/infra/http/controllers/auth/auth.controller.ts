import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { UserViewModel } from '@infra/http/view-models/user-view-model';
import { Login } from '@application/usecases/auth/login';
import { Logout } from '@application/usecases/auth/logout';
import { LoginUserBody } from '@infra/http/dtos/login-user-body';
import { AuthViewModel } from '@infra/http/view-models/auth-view-model';
import { ValidationIdParamsPipe } from '@infra/pipes/validation-params-id.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly login: Login, private readonly logout: Logout) {}

  @Post('/login')
  async loginUser(@Body() { email, password }: LoginUserBody) {
    const { user, accessToken, refreshToken } = await this.login.execute({
      email,
      password,
    });
    return {
      user: UserViewModel.toHTTP(user),
      accessToken,
      refreshToken: AuthViewModel.toHTTP(refreshToken),
    };
  }

  @HttpCode(204)
  @Post('/logout/:id')
  async logoutUser(@Param('id', ValidationIdParamsPipe) id: string) {
    await this.logout.execute({ userId: id });
  }
}
