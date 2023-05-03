import { InMemoryUserRepository } from '@test/repositories/in-memory-repository';
import { GetUser } from './get-user';
import { makeUser } from '@test/factories/user-factory';
import { NotFound } from '../errors/user-not-found';

describe('Get user', () => {
  it('should be able to get an user', async () => {
    const userRepository = new InMemoryUserRepository();
    const getUser = new GetUser(userRepository);
    const user = makeUser();
    await userRepository.create(user);
    const { user: userFind } = await getUser.execute({ userId: user.id });

    expect(userFind).toEqual(user);
  });

  it('should not be able to get an user who was not created yet', async () => {
    const userRepository = new InMemoryUserRepository();
    const getUser = new GetUser(userRepository);
    await expect(getUser.execute({ userId: 'mocked-id' })).rejects.toThrow(
      new NotFound('user'),
    );
  });
});
