import { AuthRepository } from '@application/repositories/auth-repository';
import { UserRepository } from '@application/repositories/user-repository';
import { BadRequestException, Injectable } from '@nestjs/common';
interface LogoutRequest {
  userId: string;
}
@Injectable()
export class Logout {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(request: LogoutRequest): Promise<void> {
    const user = await this.userRepository.findByIdRawUser(request.userId);

    if (user) {
      await this.authRepository.deleteRefreshToken(user.id);
    } else {
      throw new BadRequestException('Unable to logout user');
    }
  }
}
