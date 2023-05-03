import { Url } from '@application/entities/url/url';
import { Fullname } from '@application/entities/user/fullname';
import { User } from '@application/entities/user/user';
import { UserRepository } from '@application/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { NotFound } from './errors/user-not-found';

interface UpdateUserRequest {
  userId: string;
  fullname: string;
  imageUrl?: string;
}

interface UpdateUserResponse {
  user: User;
}

@Injectable()
export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const user = await this.userRepository.findById(request.userId);

    if (!user) {
      throw new NotFound('User');
    }

    user.fullname = new Fullname(request.fullname);
    request.imageUrl ? (user.imageUrl = new Url(request.imageUrl)) : null;

    await this.userRepository.save(user);
    return { user };
  }
}
