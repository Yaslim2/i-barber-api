import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { HealthController } from './controllers/health/health.controller';
import { UpdateUser } from '@application/usecases/user/update-user';
import { CreateUser } from '@application/usecases/user/create-user';
import { GetAllUsers } from '@application/usecases/user/get-all-users';
import { GetUser } from '@application/usecases/user/get-user';
import { UserController } from './controllers/user/user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt-strategy';
import { Login } from '@application/usecases/auth/login';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [HealthController, UserController],
  providers: [CreateUser, UpdateUser, GetAllUsers, GetUser, JwtStrategy, Login],
})
export class HttpModule {}
