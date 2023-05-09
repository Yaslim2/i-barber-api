import { Url } from '@application/entities/url/url';
import { Email } from '@application/entities/user/email';
import { Fullname } from '@application/entities/user/fullname';
import { PasswordHash } from '@application/entities/user/password-hash';
import { PhoneNumber } from '@application/entities/user/phone-number';
import { User } from '@application/entities/user/user';
import { hashPassword } from '@helpers/hash-password';
import { User as RawUser } from '@prisma/client';
export class PrismaUserMapper {
  static async toPrisma(user: User) {
    const password = user.password
      ? await hashPassword(user.password.value)
      : user.hashPassword.value;
    return {
      email: user.email.value,
      fullname: user.fullname.value,
      imageUrl: user.imageUrl ? user.imageUrl.value : undefined,
      password,
      socialId: user.socialId,
      id: user.id,
      phoneNumber: user.phoneNumber.value,
    };
  }

  static toDomain(raw: RawUser) {
    return new User(
      {
        email: new Email(raw.email),
        fullname: new Fullname(raw.fullname),
        imageUrl: new Url(raw.imageUrl),
        socialId: raw.socialId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        hashPassword: new PasswordHash(raw.password),
        phoneNumber: new PhoneNumber(raw.phoneNumber),
      },
      raw.id,
    );
  }
}
