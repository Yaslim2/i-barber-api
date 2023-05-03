import { Email } from './email';
import { Fullname } from './fullname';
import { Password } from './password';
import { Url } from '../url/url';
import { User } from './user';

describe('User', () => {
  it('should be able to create an user without an profile picture', () => {
    const user = new User({
      email: new Email('teste123@gmail.com'),
      fullname: new Fullname('Teste Teste'),
      password: new Password('Senha123@'),
    });

    expect(user).toBeTruthy();
  });

  it('should be able to create an user with an profile picture', () => {
    const user = new User({
      email: new Email('teste123@gmail.com'),
      fullname: new Fullname('Teste Teste'),
      password: new Password('Senha123@'),
      imageUrl: new Url(
        'https://www.wikihow.com/images_en/thumb/d/db/Get-the-URL-for-Pictures-Step-2-Version-6.jpg/v4-460px-Get-the-URL-for-Pictures-Step-2-Version-6.jpg',
      ),
    });

    expect(user).toBeTruthy();
  });
});
