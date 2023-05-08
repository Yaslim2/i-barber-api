import { InMemoryUserRepository } from '@test/repositories/in-memory-repository';
import { Login } from './login';
import { Email } from '@application/entities/user/email';
import { Password } from '@application/entities/user/password';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from '@helpers/hash-password';
import { PasswordHash } from '@application/entities/user/password-hash';
import { User } from '@application/entities/user/user';
import { Fullname } from '@application/entities/user/fullname';
import { UnprocessableEntityException } from '@nestjs/common';
import { NotFound } from '../errors/user-not-found';
describe('Login user', () => {
  it('should be able to login the user', async () => {
    const userRepository = new InMemoryUserRepository();
    const jwtService = new JwtService();
    const login = new Login(jwtService, userRepository);
    const passwordHashed = await hashPassword('Teste123@');
    const createdUser = new User({
      email: new Email('teste123@gmail.com'),
      password: new Password('Teste123@'),
      hashPassword: new PasswordHash(passwordHashed),
      fullname: new Fullname('Yaslim Soares'),
    });
    await userRepository.create(createdUser);
    const { accessToken, refreshToken, user } = await login.execute({
      email: 'teste123@gmail.com',
      password: 'Teste123@',
    });
    expect(accessToken).toBeTruthy();
    expect(refreshToken).toBeTruthy();
    expect(user).toEqual(createdUser);
  });

  it('should not be able to login an user with wrong info', async () => {
    const userRepository = new InMemoryUserRepository();
    const jwtService = new JwtService();
    const login = new Login(jwtService, userRepository);
    const passwordHashed = await hashPassword('Teste123@');
    const createdUser = new User({
      email: new Email('teste123@gmail.com'),
      password: new Password('Teste123@'),
      hashPassword: new PasswordHash(passwordHashed),
      fullname: new Fullname('Yaslim Soares'),
    });
    await userRepository.create(createdUser);
    await expect(
      login.execute({
        email: 'teste123@gmail.com',
        password: 'Teste123@@',
      }),
    ).rejects.toThrow(
      new UnprocessableEntityException('Username or password invalid'),
    );
  });

  it('should not be able to login an user with wrong info', async () => {
    const userRepository = new InMemoryUserRepository();
    const jwtService = new JwtService();
    const login = new Login(jwtService, userRepository);
    await expect(
      login.execute({
        email: 'teste123@gmail.com',
        password: 'Teste123@',
      }),
    ).rejects.toThrow(new NotFound('user'));
  });
});
