import { User } from '@application/entities/user/user';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      fullname: user.fullname.value,
      email: user.email.value,
      imageUrl: user.imageUrl?.value,
      socialId: user.socialId,
    };
  }
}
