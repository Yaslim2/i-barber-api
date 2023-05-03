import { makeUser } from '@test/factories/user-factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-repository';
import { CreateUser } from './create-user';
import { Email } from '@application/entities/user/email';
import { AlreadyInUse } from './errors/already-in-use';

describe('Create user', () => {
  it('should be able to create an user', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);

    const { user } = await createUser.execute({
      email: 'teste123@gmail.com',
      fullname: 'Teste Teste',
      password: 'Senha123@',
    });

    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0]).toEqual(user);
  });

  it('should not be able to create an user with an email that already exists', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);

    await userRepository.create(
      makeUser({ email: new Email('teste123@gmail.com') }),
    );

    await expect(
      createUser.execute({
        email: 'teste123@gmail.com',
        fullname: 'Teste Teste',
        password: 'Teste123@',
      }),
    ).rejects.toThrow(new AlreadyInUse('email'));
  });
});
