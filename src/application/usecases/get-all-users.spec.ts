import { InMemoryUserRepository } from '@test/repositories/in-memory-repository';
import { makeUser } from '@test/factories/user-factory';
import { Fullname } from '@application/entities/user/fullname';
import { GetAllUsers } from './get-all-users';

describe('Get all users', () => {
  it('should be able to get all users', async () => {
    const userRepository = new InMemoryUserRepository();
    const getAllUsers = new GetAllUsers(userRepository);
    const firstUser = makeUser({ fullname: new Fullname('Teste Teste') });
    const secondUser = makeUser({ fullname: new Fullname('John Doe') });

    await userRepository.create(firstUser);
    await userRepository.create(secondUser);
    const { users } = await getAllUsers.execute();

    expect(users).toHaveLength(2);
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fullname: new Fullname('Teste Teste') }),
        expect.objectContaining({ fullname: new Fullname('John Doe') }),
      ]),
    );
  });
});
