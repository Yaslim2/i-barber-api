import { RefreshToken } from '@application/entities/auth/refresh-token';

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export abstract class AuthRepository {
  abstract saveRefreshToken(refreshToken: RefreshToken): Promise<void>;
  abstract findRefreshToken(userId: number): Promise<RefreshToken | null>;
  abstract deleteRefreshToken(userId: number): Promise<void>;
}
