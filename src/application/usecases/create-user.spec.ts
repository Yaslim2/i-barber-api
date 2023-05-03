import { InMemoryUserRepository } from '@test/repositories/in-memory-repository';
import { CreateUser } from './create-user';

describe('Create user', () => {
  it('should be able to create an user', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);

    const { user } = await createUser.execute({
      email: 'yaslimsoares15@gmail.com',
      fullname: 'Yaslim Soares',
      password: 'Senha123@',
    });

    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0]).toEqual(user);
  });
});
