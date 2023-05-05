import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '@application/repositories/user-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { AuthRepository } from '@application/repositories/auth-repository';
import { PrismaAuthRepository } from './prisma/repositories/prisma-auth-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    { provide: AuthRepository, useClass: PrismaAuthRepository },
  ],
  exports: [UserRepository, AuthRepository],
})
export class DatabaseModule {}
