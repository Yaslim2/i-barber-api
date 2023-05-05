import { Injectable } from '@nestjs/common';
import { User as RawUser } from '@prisma/client';
import { User } from '@application/entities/user/user';
import { UserRepository } from '@application/repositories/user-repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async findByIdRawUser(userId: string): Promise<RawUser> {
    const user = await this.prismaService.user.findUnique({
      where: { secure_id: userId },
    });

    if (!user) return null;

    return user;
  }

  async create(user: User): Promise<void> {
    const data = await PrismaUserMapper.toPrisma(user);
    await this.prismaService.user.create({
      data,
    });
  }

  async findById(userId: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { secure_id: userId },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<RawUser> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();

    return users.map((user) => PrismaUserMapper.toDomain(user));
  }

  async save(user: User): Promise<void> {
    const raw = await PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.update({
      where: { secure_id: raw.secure_id },
      data: raw,
    });
  }
}
