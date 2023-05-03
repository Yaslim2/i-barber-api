import { Url } from '@application/entities/url/url';
import { Email } from '@application/entities/user/email';
import { Fullname } from '@application/entities/user/fullname';
import { Password } from '@application/entities/user/password';
import { User } from '@application/entities/user/user';
import { hashPassword } from '@helpers/hash-password';
import { User as RawUser } from '@prisma/client';
export class PrismaUserMapper {
  static async toPrisma(user: User) {
    const password = await hashPassword(user.password.value);
    return {
      email: user.email.value,
      fullname: user.fullname.value,
      imageUrl: user.imageUrl ? user.imageUrl.value : undefined,
      password,
      socialId: user.socialId,
      secure_id: user.id,
    };
  }

  static toDomain(raw: RawUser) {
    return new User(
      {
        email: new Email(raw.email),
        fullname: new Fullname(raw.fullname),
        password: new Password(raw.password),
        imageUrl: new Url(raw.imageUrl),
        socialId: raw.socialId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.secure_id,
    );
  }
}
