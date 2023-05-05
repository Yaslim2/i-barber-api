import { Injectable } from '@nestjs/common';
import { User } from '@application/entities/user/user';
import { UserRepository } from '@application/repositories/user-repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = await PrismaUserMapper.toPrisma(user);
    await this.prismaService.user.create({
      data,
    });
  }

  async findById(userId: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();

    return users.map((user) => PrismaUserMapper.toDomain(user));
  }

  async save(user: User): Promise<void> {
    const raw = await PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.update({
      where: { id: raw.id },
      data: raw,
    });
  }
}
