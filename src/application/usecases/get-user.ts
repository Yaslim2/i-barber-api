import { User } from '@application/entities/user/user';
import { UserRepository } from '@application/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { NotFound } from './errors/user-not-found';

interface GetUserRequest {
  userId: string;
}

interface GetUserResponse {
  user: User;
}

@Injectable()
export class GetUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.userRepository.findById(request.userId);
    if (!user) {
      throw new NotFound('User');
    }
    return { user };
  }
}
