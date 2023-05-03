import { Url } from '@application/entities/url/url';
import { Email } from '@application/entities/user/email';
import { Fullname } from '@application/entities/user/fullname';
import { Password } from '@application/entities/user/password';
import { User } from '@application/entities/user/user';
import { UserRepository } from '@application/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { AlreadyInUse } from '../errors/already-in-use';

interface CreateUserRequest {
  email: string;
  password: string;
  fullname: string;
  imageUrl?: string;
  socialId?: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const emailAlreadyInUse = await this.userRepository.findByEmail(
      request.email,
    );

    if (!emailAlreadyInUse) {
      const user = new User({
        email: new Email(request.email),
        fullname: new Fullname(request.fullname),
        password: new Password(request.password),
        imageUrl: request.imageUrl ? new Url(request.imageUrl) : undefined,
        socialId: request.socialId,
      });

      await this.userRepository.create(user);
      return { user };
    } else {
      throw new AlreadyInUse('email');
    }
  }
}
