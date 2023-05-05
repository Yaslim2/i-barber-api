import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { AuthRepository } from '@application/repositories/auth-repository';
import { RefreshToken } from '@application/entities/auth/refresh-token';
import { PrismaAuthMapper } from '../mappers/prisma-auth-mapper';

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(private prismaService: PrismaService) {}
  async saveRefreshToken(refreshToken: RefreshToken): Promise<void> {
    const data = await PrismaAuthMapper.toPrisma(refreshToken);
    await this.prismaService.refreshToken.create({
      data,
    });
  }
  async findRefreshToken(userId: number): Promise<RefreshToken | null> {
    const refreshToken = await this.prismaService.refreshToken.findUnique({
      where: { userId: userId },
    });

    if (!refreshToken) return null;

    return PrismaAuthMapper.toDomain(refreshToken);
  }
  async deleteRefreshToken(userId: number): Promise<void> {
    await this.prismaService.refreshToken.delete({ where: { userId } });
  }
}
