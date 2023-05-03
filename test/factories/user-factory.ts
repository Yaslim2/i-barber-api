import { Fullname } from '@application/entities/user/fullname';
import { Email } from '@application/entities/user/email';
import { Password } from '@application/entities/user/password';
import { User, UserProps } from '@application/entities/user/user';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return new User({
    email: new Email('yaslimsoares15@gmail.com'),
    fullname: new Fullname('Yaslim Soares'),
    password: new Password('Senha123@'),
    ...override,
  });
}
