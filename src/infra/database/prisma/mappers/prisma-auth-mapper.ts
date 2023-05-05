import { RefreshToken } from '@application/entities/auth/refresh-token';
import { RefreshToken as RawRefreshToken } from '@prisma/client';
export class PrismaAuthMapper {
  static async toPrisma(refreshToken: RefreshToken) {
    return {
      expiresAt: refreshToken.expiresAt.toISOString(),
      id: refreshToken.id,
      token: refreshToken.token,
      User: { connect: { id: refreshToken.userId } },
    };
  }

  static toDomain(raw: RawRefreshToken) {
    return new RefreshToken(
      {
        expiresAt: raw.expiresAt,
        token: raw.token,
        userId: raw.userId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
