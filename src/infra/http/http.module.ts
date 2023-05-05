import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { HealthController } from './controllers/health/health.controller';
import { UpdateUser } from '@application/usecases/user/update-user';
import { CreateUser } from '@application/usecases/user/create-user';
import { GetAllUsers } from '@application/usecases/user/get-all-users';
import { GetUser } from '@application/usecases/user/get-user';
import { UserController } from './controllers/user/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { Login } from '@application/usecases/auth/login';
import { AuthController } from './controllers/auth/auth.controller';
import { Logout } from '@application/usecases/auth/logout';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [HealthController, UserController, AuthController],
  providers: [CreateUser, UpdateUser, GetAllUsers, GetUser, Login, Logout],
})
export class HttpModule {}
