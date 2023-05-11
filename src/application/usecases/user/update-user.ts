import { Url } from '@application/entities/url/url';
import { Fullname } from '@application/entities/user/fullname';
import { User } from '@application/entities/user/user';
import { UserRepository } from '@application/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { NotFound } from '../errors/user-not-found';
import { Password } from '@application/entities/user/password';
import { Email } from '@application/entities/user/email';
import { PhoneNumber } from '@application/entities/user/phone-number';

interface UpdateUserRequest {
  userId: string;
  fullname: string;
  imageUrl?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
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
    request.password ? (user.password = new Password(request.password)) : null;
    request.email ? (user.email = new Email(request.email)) : null;
    request.phoneNumber
      ? (user.phoneNumber = new PhoneNumber(request.phoneNumber))
      : null;
    await this.userRepository.save(user);
    return { user };
  }
}
