import { User } from '@application/entities/user/user';
import { UserRepository } from '@application/repositories/user-repository';
import { Injectable } from '@nestjs/common';

interface GetAllUsersResponse {
  users: User[];
}

@Injectable()
export class GetAllUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<GetAllUsersResponse> {
    const users = await this.userRepository.findAll();

    return { users };
  }
}
