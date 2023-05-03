import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { HealthController } from './controllers/health/health.controller';
import { UpdateUser } from '@application/usecases/user/update-user';
import { CreateUser } from '@application/usecases/user/create-user';
import { GetAllUsers } from '@application/usecases/user/get-all-users';
import { GetUser } from '@application/usecases/user/get-user';
import { UserController } from './controllers/user/create-user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [HealthController, UserController],
  providers: [CreateUser, UpdateUser, GetAllUsers, GetUser],
})
export class HttpModule {}
