import { RefreshToken } from '@application/entities/auth/refresh-token';

export abstract class AuthRepository {
  abstract saveRefreshToken(refreshToken: RefreshToken): Promise<void>;
  abstract findRefreshToken(userId: string): Promise<RefreshToken | null>;
  abstract deleteRefreshToken(userId: string): Promise<void>;
}
