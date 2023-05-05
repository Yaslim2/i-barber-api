import { RefreshToken } from '@application/entities/auth/refresh-token';

export class AuthViewModel {
  static toHTTP(token: RefreshToken) {
    return {
      id: token.id,
      token: token.token,
      expiresAt: token.expiresAt,
      userId: token.userId,
    };
  }
}
