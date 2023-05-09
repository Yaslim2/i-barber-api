import { Fullname } from '@application/entities/user/fullname';
import { Email } from '@application/entities/user/email';
import { Password } from '@application/entities/user/password';
import { User, UserProps } from '@application/entities/user/user';
import { PhoneNumber } from '@application/entities/user/phone-number';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return new User({
    email: new Email('teste123@gmail.com'),
    fullname: new Fullname('Teste Teste'),
    password: new Password('Senha123@'),
    phoneNumber: new PhoneNumber('+5585992537717'),
    ...override,
  });
}
